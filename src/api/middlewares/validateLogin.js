const loginUserSchema = require('../schemas/loginSchema');

const fieldsMessage = 'All fields must be filled';

module.exports = async (req, _res, next) => {
  const login = req.body;

  const { error } = loginUserSchema.validate(login);

  if (error) return next({ code: 401, message: fieldsMessage });

  next();
};