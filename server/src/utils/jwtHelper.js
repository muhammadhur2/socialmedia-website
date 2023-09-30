const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign(
        {
            name: user.name,
            email: user.email
        },
        process.env.SECRET,
        { expiresIn: '1h' }  // Expires in one hour
    );
};


exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization'); // Changed from req.headers['authorization']
    if (!token) {
        return res.status(401).json({ status: 'error', error: 'Token missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (err) { // Changed from (e)
        return res.status(403).json({ status: 'error', error: 'Invalid token' });
    }
};
