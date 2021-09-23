const userModel = require('../models/user-model');
const userMiddleware = require('../middlewares/user-middleware');

const validateEmail = async (email) => {
  const findEmail = await userModel.findEmail(email);
  if (findEmail.length >= 1) return { status: 409, message: 'Email already registered' };

  return false;
};

const createUser = async (name, email, password) => {
  const validateInput = userMiddleware.fieldRequired(name, email, password);
  if (validateInput) return validateInput;

  const validatingEmail = await validateEmail(email);

  if (validatingEmail) return validatingEmail;

  const creteadUser = await userModel.createUser(name, email, password);

  return creteadUser;
};

module.exports = {
  createUser,
};
