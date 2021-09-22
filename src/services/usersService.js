const usersModel = require('../models/usersModel');

async function validateData(name, email, password) {
  const emailRegx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (!name || !email || !password || emailRegx.test(email) === false) return true;
  return false;
}

async function createUser(name, email, password) {
  const isValidated = await validateData(name, email, password);
  if (isValidated) {
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

module.exports = {
  createUser,
};