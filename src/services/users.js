const UserModels = require('../models/users');
const validation = require('./validation');

const create = async (userName, userEmail, password) => {
  const validate = validation.validateEntries(userName, userEmail, password);
  if (validate) return validate;
  const validEmail = await validation.verifyEmail(userEmail);
  if (validEmail) return validEmail;

  const result = await UserModels.create(userName, userEmail, password);
  const newUser = result.ops[0];
  const { name, email, _id } = newUser;
  return {
    user: {
      name,
      email,
      _id,
      role: 'user',
    },
  };
};

module.exports = {
  create,
};
