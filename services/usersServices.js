const usersModels = require('../models/usersModels');

const getAll = async () => {
  const users = await usersModels.getAll();
  return users;
};

const getById = async (id) => {
  const user = await usersModels.getById(id);
  return user;
};

const getByProperty = async (property, value) => {
  const user = await usersModels.getByProperty(property, value);
  return user;
};

const create = async (name, email, password, role) => {
  const user = await usersModels.create(name, email, password, role);
  return user;
};

const remove = async (id) => {
    const recipe = await usersModels.remove(id);
    return recipe;
};

module.exports = { getAll, getById, getByProperty, create, remove };