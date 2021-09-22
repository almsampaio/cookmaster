const { schemaCreateUser, schemaLoginUser } = require('../validations/validations');

const validationCreateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const validate = schemaCreateUser.validate({ name, email, password });
  if (validate.error) {
  return res.status(400)
  .json({ message: 'Invalid entries. Try again.' });
}
  next();
};

const validationLoginUser = async (req, res, next) => {
  const validate = schemaLoginUser.validate(req.body);
  if (validate.error) {
  return res.status(401)
  .json({ message: 'All fields must be filled' });
}
  next();
};

module.exports = {
  validationCreateUser,
  validationLoginUser,
};