const User = require('../models/user.model');
const bcrypt = require('../utils/bcryptHelper.js');
const jwt = require('../utils/jwtHelper');
const { verifyToken } = require('../utils/jwtHelper');

exports.register = async (req, res) => {
    try {
        if (!req.body.password) {
            return res.json({ status: 'error', error: 'Password is null' });
        }
        const hashedPassword = await bcrypt.hashPassword(req.body.password);
        
        // Debug log to check what is actually being saved
        console.log('Hashed Password:', hashedPassword);
        
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


exports.getProfile = async (req, res) => {
    try {
        // Extract user info from req.user which was attached in verifyToken middleware
        const user = await User.findOne({ email: req.user.email }, { password: 0 }); // Exclude password from query
        if (user) {
            return res.json({ status: 'ok', user });
        } else {
            return res.json({ status: 'error', error: 'User not found' });
        }
    } catch (err) {
        return res.json({ status: 'error', error: 'Error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        console.log("Request Body: ", req.body);  // Debug Line

        const updatedUser = await User.findOneAndUpdate(
            { email: req.user.email },
            { $set: { name: req.body.name, email: req.body.email } },
            { new: true, fields: { password: 0 }, w: "majority" }
        );

        console.log("Updated User: ", updatedUser);  // Debug Line

        if (updatedUser) {
            return res.json({ status: 'ok', user: updatedUser });
        } else {
            return res.json({ status: 'error', error: 'User not found' });
        }
    } catch (err) {
        console.log("Error in Update: ", err);  // Debug Line
        return res.json({ status: 'error', error: 'Update failed' });
    }
};

