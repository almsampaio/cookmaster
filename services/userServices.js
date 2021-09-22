const userModel = require('../models/userModel');

const getAll = async () => {
  const users = await userModel.getAll();
  return users;
};

const create = async (name, email, password, role) => {
  const newUser = await userModel.create(name, email, password, role);
  return newUser;
};

const getById = async (id) => {
  const user = await userModel.getById(id);
  return user;
};

module.exports = {
  getAll,
  create,
  getById,
};