const model = require('../models/users');

const createUser = async ({ name, email, password }) => {
  const alreadyExists = await model.findUserByemail(email);

  if (alreadyExists) return { code: 'invalid_data', message: 'Email already registered' };

  const user = await model.createUser({ name, email, password });
  return user;
};

module.exports = {
  createUser,
};
