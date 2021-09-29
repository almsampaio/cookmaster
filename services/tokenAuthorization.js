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
    const errorResult = { errorFound: true, status: 401, message: wrongJWT };

    return errorResult;
  }
};

// Autorização vista no repositório do Felipe Flores
//  https://github.com/tryber/sd-010-a-cookmaster/pull/80
const tokenAuthorization = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: missingToken });
  }
  
  const decodedToken = verifyToken(token);
  console.log(decodedToken);
  if (decodedToken.errorFound) return res.status(401).json({ message: wrongJWT });

  req.token = decodedToken;

  next();
};

module.exports = { tokenAuthorization, gettingToken, verifyToken }; 