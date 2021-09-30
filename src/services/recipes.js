const { Recipes } = require('../models');
const { NOT_FOUND, UNAUTHORIZED } = require('../utils/statusCodes');

const validateError = (status, message) => ({
  status,
  message,
});

const create = (name, ingredients, preparation, userId) => Recipes
    .create(name, ingredients, preparation, userId)
    .then((result) => result);

const getAll = () => Recipes.getAll().then((res) => res);

const getById = async (id) => {
  const recipe = await Recipes.getById(id);
  if (recipe === null) throw validateError(NOT_FOUND, 'recipe not found');
  return recipe;
};

const verifyAuthUser = async (id, userId, role) => {
  const recipe = await getById(id);
  if (recipe.userId !== userId && role !== 'admin') {
    throw validateError(UNAUTHORIZED, 'user unauthorized');
  }
};

const update = async (data) => {
  const { id, userId, role } = data;
  await verifyAuthUser(id, userId, role);
  Recipes.update(data).then((res) => res);
};

const exclude = async (id, userId, role) => {
  await verifyAuthUser(id, userId, role);
  const result = await Recipes.exclude(id);
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};