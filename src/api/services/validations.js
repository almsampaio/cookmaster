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
  if (error) return { error, isJoy: true, verb: 'post' };
  return false;
};

const validateSingle= async (email) => {
  
  return false;
};



module.exports = {
  validateBodyUsers,
};