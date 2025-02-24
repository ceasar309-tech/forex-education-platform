const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');

// Protect all routes in this router
router.use(protect);
router.use(authorize('admin'));

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Lock/unlock user account
router.put('/users/:id/toggle-lock', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        user.accountStatus = user.accountStatus === 'locked' ? 'active' : 'locked';
        await user.save();
        
        res.json({ message: 'User account status updated', user });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user account' });
    }
});

// Get course analytics
router.get('/analytics/courses', async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: [{
                model: UserProgress,
                attributes: ['overallProgress']
            }]
        });
        
        const analytics = courses.map(course => ({
            id: course.id,
            title: course.title,
            enrollments: course.UserProgresses.length,
            averageProgress: course.UserProgresses.reduce((acc, curr) => acc + curr.overallProgress, 0) / 
                           (course.UserProgresses.length || 1)
        }));
        
        res.json(analytics);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching course analytics' });
    }
});

module.exports = router;
