const userSchema = require('../schemas/users');
const { clientErrors } = require('../utils/httpStatusCodes');

const errorForbidden = {
  statusCode: clientErrors.forbidden,
  message: 'Only admins can register new admins',
};
const validateUserPayload = (req, _res, next) => {
  const { name, email, password } = req.body;
  const { error } = userSchema.validate({ name, email, password });
  if (error) {
    const updatedError = { ...error, statusCode: clientErrors.badRequest };
    return next(updatedError);
  }
  return next();
};

const isAdmin = (req, _res, next) => {
  const { userRole } = req;
  if (userRole !== 'admin') return next(errorForbidden);
  next();
};

module.exports = { validateUserPayload, isAdmin };