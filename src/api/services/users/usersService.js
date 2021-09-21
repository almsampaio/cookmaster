const {
  createModel,
  readByEmailModel,
} = require('../../models/users/usersModel');

const createServices = async (name, email, password, role) => {
  const emailFound = await readByEmailModel(email);

  if (emailFound) {
    return { message: 'Email already registered' };
  }

  const data = await createModel(name, email, password, role);
  return { data };
};

module.exports = {
  createServices,
};