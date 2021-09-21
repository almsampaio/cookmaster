const usersModel = require('../models/usersModel');

const checkCreateData = (name, email, password) => {
  if (!name || !email || !password) return { status: 401, message: 'Invalid entries. Try again.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email)) return { status: 401, message: 'Invalid entries. Try again.' };
  return true;
};

const create = async (name, email, password) => {
  if (checkCreateData(name, email, password).status) return checkCreateData(name, email, password);
  if (usersModel.getByEmail(email)) return { status: 409, message: 'Email already registered' };
  const createdUser = await usersModel.create(name, email, password);
  return { status: 200, createdUser };
};

module.exports = {
  create,
};
