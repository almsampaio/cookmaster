const { unauthorized } = require('../utils/httpStatus');

const authUserPermissions = (request, response, next) => {
  const { decodeToken, recipe } = request;
  const { _id: userId, role } = decodeToken;

  const err = { status: unauthorized, message: 'jwt malformed' };

  switch (true) {
    case role === 'admin':
      return next();
    case userId !== recipe.userId:
      return next(err);
    default:
      next();
  }
};

module.exports = authUserPermissions;
