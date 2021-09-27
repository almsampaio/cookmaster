const { 
  create,
  getAll,
} = require('../models/Users');

const verifyDataUser = (name, email, password) => {
  const regexEmail = /\S+@\S+\.\S+/;
  if (!name || !email || !password || !regexEmail.test(email)) {
    return { 
      status: 400, message: 'Invalid entries. Try again.' };
    }
  return false;
};

const addUser = async (name, email, password) => {
  const verifyUser = verifyDataUser(name, email, password);
  if (verifyUser) return verifyUser;

  const bool = (await getAll()).some((user) => user.email === email);
  if (bool) return { status: 409, message: 'Email already registered' };

  const result = await create(name, email, password);

  return result;
};

module.exports = {
  addUser,
};
