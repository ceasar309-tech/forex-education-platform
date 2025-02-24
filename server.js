require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const subscriptionRoutes = require('./routes/subscriptions');
const adminRoutes = require('./routes/admin');

// Import models
const User = require('./models/User');
const Course = require('./models/Course');
const UserProgress = require('./models/UserProgress');
const UserNote = require('./models/UserNote');
const CourseFeedback = require('./models/CourseFeedback');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define model associations
User.hasMany(UserProgress, { foreignKey: 'userId' });
UserProgress.belongsTo(User, { foreignKey: 'userId' });
Course.hasMany(UserProgress, { foreignKey: 'courseId' });
UserProgress.belongsTo(Course, { foreignKey: 'courseId' });

User.hasMany(UserNote, { foreignKey: 'userId' });
UserNote.belongsTo(User, { foreignKey: 'userId' });
Course.hasMany(UserNote, { foreignKey: 'courseId' });
UserNote.belongsTo(Course, { foreignKey: 'courseId' });

User.hasMany(CourseFeedback, { foreignKey: 'userId' });
CourseFeedback.belongsTo(User, { foreignKey: 'userId' });
Course.hasMany(CourseFeedback, { foreignKey: 'courseId' });
CourseFeedback.belongsTo(Course, { foreignKey: 'courseId' });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/admin', adminRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Forex Education Platform API is running' });
});

const PORT = 5001;

// Sync database and start server
sequelize.sync({ alter: true }) // Use alter:true in development to auto-update tables
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
