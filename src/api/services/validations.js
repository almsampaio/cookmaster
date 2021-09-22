const Joi = require('joi');
const usersModels = require('../models/users');
// const jwt = require('jsonwebtoken');

// const JWT_SECRET  = 'meuSegredo';

const validateBodyUsers = (body) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }).validate(body);
  if (error) return { verb: 'post', item: 'users', error, isJoy: true };
  return false;
};

const validateSingleUserEmail = async (email) => {
  const getUserByEmail = await usersModels.getUserByEmail(email);
  if (getUserByEmail.length) return { verb: 'post', item: 'users', error: true };
  return false;
};

module.exports = {
  validateBodyUsers,
  validateSingleUserEmail,
};