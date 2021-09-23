const modelsUsers = require('../models/usersModels');

const err = {
  fieldRequired: 'All fields must be filled', // 401
  fieldInvalid: 'Incorrect username or password', // 401
};

const emailORequired = (email) => {
  //  || email === '' || typeof email !== 'string'

  // const regexEmail = /[^@]+@[^.]+\..+/g;
  // if (!regexEmail.test(email)) return { message: err.fieldInvalid };

  if (!email) return { message: err.fieldRequired };

  return false;
};

const emailNotExists = async (email) => {
  const userEmail = await modelsUsers.findByEmail(email);
  // const userEmail = users.find((user) => user.email !== email);
  
  if (!userEmail) return { message: err.fieldInvalid };

  return false;
};

const passwordRequired = (password) => {
  // || password === '' || typeof password !== 'string'
  if (!password) return { message: err.fieldRequired };
  return false;
};

module.exports = {
  emailORequired,
  passwordRequired,
  emailNotExists,
};