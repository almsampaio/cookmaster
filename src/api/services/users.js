const jwt = require('jsonwebtoken');

const { Secret, jwtConfig } = require('./jwt');

const {
  createModel,
  readByEmailModel,
  readByEmailAndPasswordModel,
} = require('../models/user');

const createServices = async (name, email, password, role) => {
  const emailFound = await readByEmailModel(email);

  if (emailFound) {
    return { message: 'Email already registered' };
  }

  const data = await createModel(name, email, password, role);
  return { data };
};

const createTokenServices = async (email, password) => {
  const data = await readByEmailAndPasswordModel(email, password);

  if (!data) {
    return { message: 'Incorrect username or password' };
  }

  const { _id, role } = data;
  
  const payload = {
    _id,
    email,
    role,
  };

  const token = jwt.sign(payload, Secret, jwtConfig);
  
  return { token };
};

module.exports = {
  createServices,
  createTokenServices,
};