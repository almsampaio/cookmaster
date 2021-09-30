const jwt = require('jsonwebtoken');
const SECRET = require('../utils/secret');

function tokenValidation(req, res, next) {
    const { authorization } = req.headers;

    if (authorization === undefined) {
    return res.status(401).json({ message: 'missing auth token' });
    }

    try {
    const payload = jwt.verify(authorization, SECRET);

    req.payload = payload;
    return next();
    } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
    }
}

module.exports = { tokenValidation }; 
