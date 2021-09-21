const jwt = require('jsonwebtoken');

const secret = 'projetoToken';

const takeToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (e) {
        return false;
    }
};

module.exports = takeToken;