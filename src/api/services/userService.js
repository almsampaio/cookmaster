const userModel = require('../models/userModel');

const error = {
    emailConflict: {
      message: 'Email already registered',
      code: 409,
    },
};

const signUp = async ({ name, email, password }) => {
  const user = {
    name,
    email,
    password,
    role: 'user',
  };

  const EmailAlreadyExists = await userModel.findByEmail(email);

  if (EmailAlreadyExists) return { error: error.emailConflict };

  const result = await userModel.signUp(user);

  return result;
};

module.exports = { signUp };