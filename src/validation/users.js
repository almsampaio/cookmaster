const users = require('../models/users');

const fields = (user) => {
  if (!user.name || !user.email || !user.password) {
    const err = { status: 400, message: 'Invalid entries. Try again.' };
    throw err;
  }
  return null;
};

const regexEmail = (email) => {
  const validEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  if (!validEmail) {
    const err = { status: 400, message: 'Invalid entries. Try again.' };
    throw err;
  }
  return null;
};

const exists = async (email) => {
  const result = await users.findByEmail(email);
  if (result) {
    const err = { status: 409, message: 'Email already registered' }; 
    throw err;
  }
  return null;
};

const user = async (userFields) => {
  fields(userFields);
  regexEmail(userFields.email);
  await exists(userFields.email);
};

module.exports = {
  user,
};