const { 
  create,
} = require('../models/Users');

const verifyDataUser = (name, email, password) => {
  if (!name || !email || !password) return { status: 400, message: 'Invalid entries. Try again.' };

  return false;
};

const addUser = async (name, email, password) => {
  const verifyUser = verifyDataUser(name, email, password);

  if (verifyUser) return verifyDataUser(name, email, password);

  const result = await create(name, email, password);

  return result;
};

module.exports = {
  addUser,
};
