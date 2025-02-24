const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserProgress = sequelize.define('UserProgress', {
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
    completedModules: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    overallProgress: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    lastAccessDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = UserProgress;
