const jwt = require('jsonwebtoken');

const SECRET = 'minhasupersenha';

const validateToken = (authorization) => {
    if (!authorization) {
        return { obj: { message: 'missing auth token' }, status: 401 };
    } 
    try {
        const user = jwt.verify(authorization, SECRET);
        return user;
    } catch (e) {
        return { obj: { message: 'jwt malformed' }, status: 401 };
    }
};

module.exports = {
    validateToken,
};