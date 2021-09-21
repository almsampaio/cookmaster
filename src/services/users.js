const validations = require('../schemas/validations');
const usersModel = require('../models/users');

const createUser = async (name, email, password) => {
  const validateEmail = await validations.validateUserEmail(email);
  const validateName = validations.validateUserName(name);
  const validatePassword = validations.validateUserPassword(password);
  console.log(validateEmail);
  if (validateEmail.code) return validateEmail;
  if (validateName.code) return validateName;
  if (validatePassword.code) return validatePassword;

  const role = 'user';
  const user = await usersModel.createUser(name, email, password, role);

  return { user: {
    name,
    email,
    role,
    _id: user.insertedId,
  },  
  };
};

module.exports = {
  createUser,
};