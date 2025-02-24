const sequelize = require('./database');
const User = require('../models/User');
const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');
const UserNote = require('../models/UserNote');
const CourseFeedback = require('../models/CourseFeedback');
const bcrypt = require('bcryptjs');
const { advancedForexCourses, advancedDerivCourses, beginnerCourses } = require('../seeds/advancedCourseContent');

async function initializeDatabase() {
    try {
        // Force recreate all tables
        await sequelize.sync({ force: true });
        console.log('Database tables created');

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'Admin',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
            accountStatus: 'active',
            subscriptionStatus: 'premium'
        });
        console.log('Admin user created');

        // Create courses
        const allCourses = [
            ...advancedForexCourses,
            ...advancedDerivCourses,
            ...beginnerCourses
        ];

        await Course.bulkCreate(allCourses);
        console.log(`${allCourses.length} courses created`);

        console.log('Database initialization completed successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    initializeDatabase()
        .then(() => {
            console.log('Database initialization completed');
            process.exit(0);
        })
        .catch(error => {
            console.error('Failed to initialize database:', error);
            process.exit(1);
        });
}

module.exports = initializeDatabase;
