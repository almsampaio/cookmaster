const newUserSchema = require('../schemas/userSchema');

const entriesMessage = 'Invalid entries. Try again.';

const newUserValidate = async (req, _res, next) => {
  const newUser = req.body;

  const { error } = newUserSchema.validate(newUser);

  if (error) return next({ code: 400, message: entriesMessage });

  next();
};

module.exports = newUserValidate;