require('dotenv').config();
const mongoose = require('mongoose');
const { forexCourses, derivCourses, beginnerCourses } = require('./courseSeeds');
const { advancedForexCourses, advancedDerivCourses } = require('./advancedCourseContent');

// Models
const Course = require('../models/Course');
const User = require('../models/User');

const initializeDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/forex-education', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB...');

        // Clear existing data
        await Course.deleteMany({});
        console.log('Cleared existing courses...');

        // Combine all courses
        const allCourses = [
            ...forexCourses,
            ...derivCourses,
            ...beginnerCourses,
            ...advancedForexCourses,
            ...advancedDerivCourses
        ];

        // Insert courses
        await Course.insertMany(allCourses);
        console.log(`Inserted ${allCourses.length} courses...`);

        // Create admin user if it doesn't exist
        const adminExists = await User.findOne({ email: 'admin@example.com' });
        if (!adminExists) {
            const admin = new User({
                name: 'Admin',
                email: 'admin@example.com',
                password: '$2a$10$XFXxGrhh6pqWmqYbH.YuZ.3QR6YuN5DYJcYHF.l8z8FzWkP.ELmTi', // password: admin123
                role: 'admin',
                accountStatus: 'active'
            });
            await admin.save();
            console.log('Created admin user...');
        }

        console.log('Database initialization completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
};

initializeDatabase();
