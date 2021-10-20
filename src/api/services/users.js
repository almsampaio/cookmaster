const Joi = require('joi');

const usersModel = require('../models/user');

const REGISTERED_EMAIL = { message: 'Email already registered', status: 409 };
const INVALID_ENTRIES = { message: 'Invalid entries. Try again.', status: 400 };
const FORBIDDEN = { message: 'Only admins can register new admins', status: 403 };

const validateUser = Joi.object({
  name: Joi.string().min(4).required(),
  password: Joi.string().min(5).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
});

const registerUser = async (userData) => {
  const { value, error } = validateUser.validate(userData);

  if (error) return { error: INVALID_ENTRIES };

  const checkEmail = await usersModel.getEmail(userData.email);

  if (checkEmail) return { error: REGISTERED_EMAIL };

  const { _id, email, name, role } = await usersModel.registerUser(value);

  return { result: { user: { id: _id, email, name, role } } };
};

const registerAdmin = async (userData, userRole) => {
  if (userRole !== 'admin') return { error: FORBIDDEN };

  const { value, error } = validateUser.validate(userData);

  if (error) return { error: INVALID_ENTRIES };

  const checkEmail = await usersModel.getEmail(userData.email);

  if (checkEmail) return { error: REGISTERED_EMAIL };

  const { _id, userData: { email, name }, role } = await usersModel.registerAdmin(value);

  return { result: { user: { _id, email, name, role } } };
};

module.exports = {
  registerUser,
  registerAdmin,
};
