const userModel = require('../models/usersModel');
const userValidations = require('../validations/userValidations');

const addUser = async (name, email, password) => {
  userValidations.validateName(name);
  userValidations.validateEmail(email);
  console.log('Service');
  userValidations.validatePassword(password);
  await userValidations.emailExists(email);
  const result = await userModel.addUser(name, email, password);
  delete result.user.password;
  return { status: 201, result };
};

module.exports = { addUser };
