const newUserSchema = require('../schemas/userSchema');

const newUserValidate = async (req, _res, next) => {
  const newUser = req.body;

  const { error } = newUserSchema.validate(newUser);

  if (error) return next(error);

  next();
};

module.exports = newUserValidate;