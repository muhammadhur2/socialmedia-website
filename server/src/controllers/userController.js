const User = require('../models/user.model');
const bcrypt = require('../utils/bcryptHelper.js');
const jwt = require('../utils/jwtHelper');

exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hashPassword(req.body.password);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.json({ status: 'ok' });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', error: 'Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const match = await bcrypt.comparePassword(req.body.password, user.password);
            if (match) {
                const token = jwt.generateToken(user);
                return res.json({ status: 'ok', user: token });
            } else {
                return res.json({ status: 'error', user: false });
            }
        } else {
            return res.json({ status: 'error', user: false });
        }
    } catch (err) {
        res.json({ status: 'error', error: 'Error' });
    }
};
