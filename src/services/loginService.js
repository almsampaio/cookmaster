const userModel = require('../models/userModel');

const validateEntry = (email, password) => {
    if (!email || !password) {
      return false;
    }

    return true;
};

const validateEmail = (email) => {
    const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

    if (!regexEmail.test(email)) {
        return false;
    }

    return true;
};

const existentPassword = (loginUser, passUser) => {
  if (!loginUser) {
      return false;
  }

  const { password } = loginUser;

  if (password !== passUser) {
      return false;
  }

  return true;
};

const login = async ({ email, password }) => {
    const validateFields = validateEntry(email, password);
    const validEmail = validateEmail(email);

    if (!validateFields) {
        return { message: 'All fields must be filled' }; 
    }

    if (!validEmail) {
        return { message: 'Incorret username or password' }; 
    }

    const userLogin = await userModel.getUser({ email, password });

    const existentPasswords = existentPassword(userLogin, password);
    if (!existentPasswords) {
        return { message: 'Incorrect username or password' };
    }

    return userLogin;
};

module.exports = { login }; 