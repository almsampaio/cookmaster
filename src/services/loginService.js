const userModel = require('../models/usersModel');

const verify = (email, password) => {
  if (!email || !password) {
    return {
      code: 401,
      message: 'All fields must be filled',
    };
  }
  return {};
};

const login = async (email, password) => {
  const verifica = verify(email, password);
  if (verifica.message) return verifica;
  const user = await userModel.findEmail(email);
  if (!user || user.password !== password) {
    return {
      code: 401,
      message: 'Incorrect username or password', 
    };
  }
  return user;
};

module.exports = { login };
