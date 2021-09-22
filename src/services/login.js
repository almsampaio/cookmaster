const model = require('../models/login');

const login = async (email, password) => {
    const existingUser = await model.login(email, password);
    if (!existingUser) {
      return ({ message: 'Incorrect username or password' });
    }
    return existingUser;
  };
  module.exports = { login };