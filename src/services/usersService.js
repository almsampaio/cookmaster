const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const secret = 'secrettoken';

async function validateData(name, email, password) {
  const emailRegx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (!name || !email || !password || emailRegx.test(email) === false) return true;
  return false;
}

async function createUser(name, email, password) {
  const isNotValidated = await validateData(name, email, password);
  if (isNotValidated) {
     const error = { 
        message: 'Invalid entries. Try again.',
        status: 400,
      };
    return { error };
  }

  const existingEmail = await usersModel.findUserByEmail(email);
  if (existingEmail) {
    const error = {
      message: 'Email already registered',
      status: 409,
    };
    return { error };
  }

  const user = await usersModel.createUser(name, email, password);
  return user;
}

async function verifyLogin(email, password) {
  const existingEmail = await usersModel.findUserByEmail(email);
  if (!existingEmail || existingEmail.password !== password) {
    const error = {
      message: 'Incorrect username or password',
      status: 401,
    };
    return { error };
  }
  return true;
}

async function createToken(user) {
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return { token };
}

async function loginUser(email, password) {
  if (!email || !password) {
    const error = {
      message: 'All fields must be filled',
      status: 401,
    };
    return { error };
  }

  const login = await verifyLogin(email, password);
  if (login.error) return login;
  const user = await usersModel.findUserByEmail(email);

  const token = await createToken(user);
  return token;
}

module.exports = {
  createUser,
  loginUser,
};