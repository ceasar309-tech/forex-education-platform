const User = require('../models/User');

module.exports = async function(req, res, next) {
    try {
        const user = await User.findById(req.user.id);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admin privileges required.' });
        }

        next();
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
