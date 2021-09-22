const jwt = require('jsonwebtoken');

const secret = '12345';

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({ message: 'missing auth token' });

    try {
        const tokenPayload = jwt.verify(authorization, secret);
        req.user = tokenPayload;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'jwt malformed' });
    }
};

module.exports = validateToken;