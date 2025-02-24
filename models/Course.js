const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('forex', 'deriv'),
        allowNull: false
    },
    level: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'pro'),
        allowNull: false
    },
    modules: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    prerequisites: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    duration: {
        type: DataTypes.STRING
    },
    isLocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Course;
