const model = require('../models/users');

const createUser = async ({ name, email, password }) => {
  const alreadyExists = await model.findUserByemail(email);

  if (alreadyExists) return { error: { message: 'Email already registered' } };

  const user = await model.createUser({ name, email, password });
  return user;
};

module.exports = {
  createUser,
};
