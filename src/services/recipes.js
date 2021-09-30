const { Recipes } = require('../models');
const { NOT_FOUND } = require('../utils/statusCodes');

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

module.exports = {
  create,
  getAll,
  getById,
};