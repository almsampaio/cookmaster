const usersModel = require('../models/usersModel');

const checkCreateData = (name, email, password) => {
  const message = { message: 'Invalid entries. Try again.' };
  if (!name || !email || !password) return { status: 400, message };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email)) return { status: 400, message };
  return false;
};

const create = async (name, email, password) => {
  if (checkCreateData(name, email, password)) return checkCreateData(name, email, password);
  if ((await usersModel.getByEmail(email))) {
    return { status: 409, message: { message: 'Email already registered' } };
  }
  const message = await usersModel.create(name, email, password);
  return { status: 200, message };
};

module.exports = {
  create,
};
