const jwt = require('jsonwebtoken');

const secret = 'projetoToken';

const getToken = (data) => {
    const jwtConfig = {
        expiresIn: '1d',
        algorithm: 'HS256',
      };
    const token = jwt.sign({ data }, secret, jwtConfig);
    return token;
};

module.exports = getToken;