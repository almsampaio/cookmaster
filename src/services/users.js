const model = require('../models/users');

const createUser = async ({ name, email, password }) => {
  const alreadyExists = await model.findUserByEmail(email);

  if (alreadyExists) return { error: { code: 409, message: 'Email already registered' } };

  const user = await model.createUser({ name, email, password });
  return user;
};

module.exports = {
  createUser,
};
