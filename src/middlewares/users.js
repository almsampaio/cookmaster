const userSchema = require('../schemas/users');
const { clientErrors } = require('../utils/httpStatusCodes');

const validateUserPayload = (req, _res, next) => {
  const { name, email, password } = req.body;
  const { error } = userSchema.validate({ name, email, password });
  if (error) {
    const updatedError = { ...error, statusCode: clientErrors.badRequest };
    return next(updatedError);
  }
  return next();
};

module.exports = { validateUserPayload };