const { 
  create,
} = require('../models/Users');

const addUser = async (name, email, password) => {
  const result = await create(name, email, password);

  return result;
};

module.exports = {
  addUser,
};
