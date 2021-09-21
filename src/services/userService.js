const userModel = require('../models/userModel');

const message1 = { 
  err: {
    message: 'Invalid entries. Try again.',
    status: 400 },
};

const message2 = {
  err: {
    message: 'Email already registered',
      status: 409,
  },
};
const userRegistered = async (name, email, password) => {
  const re = /\S+@\S+\.\S+/;

  if (!re.test(String(email).toLowerCase()) || !name || !password) {
    return message1;
  }

  const emailExists = await userModel.getUserByEmail(email);
  if (emailExists) {
    return message2;
  }

  const registeredUser = await userModel.insertUser(name, email, password);
  return registeredUser;
};

module.exports = {
  userRegistered,
};