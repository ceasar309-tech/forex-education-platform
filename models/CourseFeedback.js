const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CourseFeedback = sequelize.define('CourseFeedback', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Courses',
            key: 'id'
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comment: {
        type: DataTypes.TEXT
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = CourseFeedback;
