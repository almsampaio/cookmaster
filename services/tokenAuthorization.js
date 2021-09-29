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
    console.log(decode);

    return decode;
  } catch (error) {
    // console.log(error);
    const errorResult = { errorFound: true, status: 401, message: wrongJWT };

    return errorResult;
  }
};

// Autorização vista no repositório do Felipe Flores
//  https://github.com/tryber/sd-010-a-cookmaster/pull/80
const tokenAuthorization = (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    const errorResult = { errorFound: true, status: 401, message: missingToken };
    // return res.status(401).json({ message: missingToken });
    return next(errorResult);
  }
  
  const decodedToken = verifyToken(token);

  if (decodedToken.errorResult) return next(decodedToken);

  req.token = decodedToken;

  next();
};

module.exports = { tokenAuthorization, gettingToken, verifyToken }; 