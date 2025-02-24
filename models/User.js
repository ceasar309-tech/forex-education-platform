const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
    accountStatus: {
        type: DataTypes.ENUM('active', 'locked', 'trial'),
        defaultValue: 'trial'
    },
    subscriptionStatus: {
        type: DataTypes.ENUM('trial', 'premium', 'expired', 'canceling', 'payment_failed'),
        defaultValue: 'trial'
    },
    stripeCustomerId: {
        type: DataTypes.STRING,
        unique: true
    },
    trialEnds: {
        type: DataTypes.DATE,
        defaultValue: () => new Date(Date.now() + 7*24*60*60*1000) // 7 days from now
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    }
});

module.exports = User;
