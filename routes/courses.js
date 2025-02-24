const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');
const UserNote = require('../models/UserNote');
const CourseFeedback = require('../models/CourseFeedback');

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.findAll({
            where: req.query.type ? { type: req.query.type } : {},
            include: [{
                model: CourseFeedback,
                attributes: ['rating']
            }]
        });

        const coursesWithRating = courses.map(course => ({
            ...course.toJSON(),
            averageRating: course.CourseFeedbacks.length > 0 
                ? course.CourseFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) / course.CourseFeedbacks.length 
                : 0
        }));

        res.json(coursesWithRating);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courses' });
    }
});

// Get single course with progress if authenticated
router.get('/:id', protect, async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id, {
            include: [{
                model: CourseFeedback,
                attributes: ['rating', 'comment'],
                include: [{
                    model: User,
                    attributes: ['name']
                }]
            }]
        });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Get user's progress if they're enrolled
        const userProgress = await UserProgress.findOne({
            where: {
                userId: req.user.id,
                courseId: course.id
            }
        });

        // Get user's notes
        const userNotes = await UserNote.findAll({
            where: {
                userId: req.user.id,
                courseId: course.id
            }
        });

        res.json({
            ...course.toJSON(),
            userProgress: userProgress || null,
            userNotes: userNotes || []
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching course' });
    }
});

// Update user progress
router.post('/:id/progress', protect, async (req, res) => {
    try {
        const { moduleIndex, progress } = req.body;

        let userProgress = await UserProgress.findOne({
            where: {
                userId: req.user.id,
                courseId: req.params.id
            }
        });

        if (!userProgress) {
            userProgress = await UserProgress.create({
                userId: req.user.id,
                courseId: req.params.id,
                completedModules: [],
                overallProgress: 0
            });
        }

        // Update completed modules
        const completedModules = userProgress.completedModules || [];
        if (!completedModules.includes(moduleIndex)) {
            completedModules.push(moduleIndex);
        }

        // Calculate overall progress
        const course = await Course.findByPk(req.params.id);
        const totalModules = course.modules.length;
        const overallProgress = (completedModules.length / totalModules) * 100;

        userProgress.completedModules = completedModules;
        userProgress.overallProgress = overallProgress;
        await userProgress.save();

        res.json(userProgress);
    } catch (err) {
        res.status(500).json({ message: 'Error updating progress' });
    }
});

// Add/update note
router.post('/:id/notes', protect, async (req, res) => {
    try {
        const { moduleIndex, content } = req.body;

        const note = await UserNote.create({
            userId: req.user.id,
            courseId: req.params.id,
            moduleIndex,
            content
        });

        res.json(note);
    } catch (err) {
        res.status(500).json({ message: 'Error saving note' });
    }
});

// Add course feedback
router.post('/:id/feedback', protect, async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const feedback = await CourseFeedback.create({
            userId: req.user.id,
            courseId: req.params.id,
            rating,
            comment
        });

        res.json(feedback);
    } catch (err) {
        res.status(500).json({ message: 'Error saving feedback' });
    }
});

module.exports = router;
