const UserModels = require('../models/users');
const validation = require('../utils/validation');

const create = async (userName, userEmail, password) => {
  const validate = validation.validateEntries(userName, userEmail, password);
  if (validate) return validate;

  const validEmail = await validation.verifyEmail(userEmail);
  if (validEmail) return validEmail;
  
  const result = await UserModels.create(userName, userEmail, password);
  const newUser = result.ops[0];
  const { name, email, _id } = newUser;
  return { user: { name, email, _id, role: 'user' } };
};

const getByEmail = async (email) => {
  const user = await UserModels.getByEmail(email);
  return user;
};

const login = async (userEmail, password) => {
  const validateFields = validation.validateLoginFields(userEmail, password);
  if (validateFields) return validateFields;

  const verifyLogin = await validation.verifyLogin(userEmail, password);
  if (verifyLogin) return verifyLogin;

  const logged = await getByEmail(userEmail);
  console.log(logged);
  return logged;
};

module.exports = {
  create,
  getByEmail,
  login,
};
