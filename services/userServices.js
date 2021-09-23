const userModel = require('../models/userModel');

const getAll = async () => {
  const users = await userModel.getAll();
  return users;
};

const create = async (name, email, password) => {
  const newUser = await userModel.create(name, email, password);
  return newUser;
};

const createAdmin = async (name, email, password) => {
  const newAdmin = await userModel.createAdmin(name, email, password);
  return newAdmin;
};

const getById = async (id) => {
  const user = await userModel.getById(id);
  return user;
};

const findUserByEmail = async (email) => {
  const user = await userModel.findUserByEmail(email);
  // console.log(user.name, 'teste services userServices');
  return user;
};

module.exports = {
  getAll,
  create,
  createAdmin,
  getById,
  findUserByEmail,
};