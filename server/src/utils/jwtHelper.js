const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign({
        name: user.name,
        email: user.email
    }, process.env.SECRET);
};
