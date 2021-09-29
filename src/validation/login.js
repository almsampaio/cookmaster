const users = require('../models/users');

const fields = (data) => {
  if (!data.email || !data.password) {
    const err = { status: 401, message: 'All fields must be filled' };
    throw err;
  }
  return null;
};

const emailValid = async (data) => {
  const result = await users.findByEmail(data.email);
  if (!result || result.password !== data.password) {
    const err = { status: 401, message: 'Incorrect username or password' }; 
    throw err;
  }
  return result;
};

const login = async (data) => {
  fields(data);
  const result = await emailValid(data);
  return result;
};

module.exports = {
  login,
};