const model = require('../models/users');

const createUser = async (name, email, password) => {
    const existingEmail = await model.findByEmail(email);
    if (existingEmail) {
      return {
        err: { message: 'Email already registered' },
      };
    }   
    return model.createUser(name, email, password);
};
const login = async (email, password) => {
  const existingUser = await model.login(email, password);
  if (!existingUser) {
    return ({ message: 'Incorrect username or password' });
  }
  return existingUser;
};
module.exports = { createUser, login };