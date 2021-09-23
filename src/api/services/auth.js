const jwt = require('jsonwebtoken');

const SECRET = 'minhasupersenha';

const validateToken = (authorization) => {
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