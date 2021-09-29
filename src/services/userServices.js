const model = require('../models/userModel');

const create = async (name, email, password) => {
  const searchByEmail = await model.searchByEmail(email);
  
  if (searchByEmail) return { message: 'Email already registered' };

  const user = await model.create(name, email, password);

  return user;
};

module.exports = {
  create,
};