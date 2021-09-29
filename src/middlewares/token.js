const jwt = require('jsonwebtoken');
const SECRET = require('../utils/secret');

function newToken(user) {
const { password: _, ...payload } = user;
const jwtConfig = {
algorithm: 'HS256',
expiresIn: '5d',
};
const token = jwt.sign(payload, SECRET, jwtConfig);
return { token };
}

module.exports = { newToken };
