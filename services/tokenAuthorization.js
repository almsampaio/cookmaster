const jwt = require('jsonwebtoken');

const {
  wrongJWT,
  missingToken,
} = require('../utils/errorMessages');

const SECRET = 'secret';

const gettingToken = (payload) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
};

const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, SECRET);

    return decode;
  } catch (error) {
    const errorResult = { errorFound: true, code: 401, message: wrongJWT };

    return errorResult;
  }
};

const tokenAuthorization = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    const errorResult = { errorFound: true, code: 401, message: missingToken };

    return next(errorResult);
  }

  const decodedToken = verifyToken(token);

  if (decodedToken.errorResult) return next(decodedToken);

  req.token = decodedToken;

  next();
};

module.exports = { tokenAuthorization, gettingToken, verifyToken }; 