const ModelUsers = require('../model/users');

const re = /\S+@\S+\.\S+/;

const util = (status, message) => ({ status, message });

const validateUser = (name, password, email) => {
  if (!name) return null;

  if (!email || !re.test(email)) return null;

  if (!password) return null;

  return true;
};

const addUser = async (name, password, email) => {
  const role = 'user';
  const findEmail = await ModelUsers.findEmail(email);
  const validations = validateUser(name, password, email);

  if (findEmail) throw util(409, 'Email already registered');

  if (validations === null) throw util(400, 'Invalid entries. Try again.');

  const insert = await ModelUsers.addUser(name, password, email, role);

  return insert;
};

module.exports = {
  addUser,
};
