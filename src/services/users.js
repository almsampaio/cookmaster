const modelUsers = require('../models/users');
const validations = require('../schemas/validationsUsers');

const create = async (name, email, password) => {
  const validateName = validations.validateName(name);
  if (validateName) return { status: 400, data: validateName };

  const validateEmail = validations.validateEmail(email);
  if (validateEmail) return { status: 400, data: validateEmail };

  const validatePassword = validations.validatePassword(password);
  if (validatePassword) return { status: 400, data: validatePassword };

  const verifyEmail = await validations.verifyEmail(email);
  if (verifyEmail) return { status: 409, data: verifyEmail };

  const [newUser] = await modelUsers.create(name, email, password);

  const { password: _, ...user } = newUser;

  return { status: 201, data: { user } };
};

const createAdmin = async (dataBody, role) => {
  const { name, email, password } = dataBody;
  
  const { password: _, ...result } = await modelUsers.createAdmin(name, email, password, role);
  return result;
};

module.exports = {
  create,
  createAdmin,
};
