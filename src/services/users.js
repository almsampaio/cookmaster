const UserModels = require('../models/users');
const validation = require('./validation');

const getByEmail = async (email) => {
  const user = await UserModels.getByEmail(email);
  return user;
};

const create = async (userName, userEmail, password) => {
  const validate = validation.validateEntries(userName, userEmail, password);
  if (validate) return validate;
  const validEmail = await validation.verifyEmail(userEmail);
  if (validEmail) return validEmail;

  const result = await UserModels.create(userName, userEmail, password, 'user');
  const newUser = result.ops[0];
  const { name, email, _id, role } = newUser;
  return {
    user: {
      name,
      email,
      _id,
      role,
    },
  };
};

module.exports = {
  create,
  getByEmail,
};
