const userModels = require('../models/userModels');

const postUser = async (name, password, email) => {
  const verifyEmail = await userModels.getByEmail(email);
  const error = { message: 'Email already registered' };
  const newUser = await userModels.postUser(name, password, email);

  if (verifyEmail) {
    return error;
  }

  return { 
    user: newUser,
  };
};

const postLogin = async (email, password) => userModels.postLogin(email, password);

module.exports = { postUser, postLogin };
