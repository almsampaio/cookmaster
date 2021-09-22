const { StatusCodes: { UNAUTHORIZED } } = require('http-status-codes');
const { verify } = require('jsonwebtoken');

const SECRET = 'weAllMustKnowHowToUseEnvironmentVariables';

const authentication = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) next({ message: 'missing auth token', statusCode: UNAUTHORIZED });
    const { userWithoutPassword } = verify(authorization, SECRET);
    req.user = userWithoutPassword;
    next();
  } catch (e) {
    next({ message: 'jwt malformed', statusCode: UNAUTHORIZED });
  }
};

module.exports = {
  authentication,
};