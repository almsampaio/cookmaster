const recipesModel = require('../model/recipesModel');
const { CREATED, OK } = require('../utils/status');

const create = async (recipe) => {
  const createRecipe = await recipesModel.create(recipe);
  return {
    status: CREATED,
    message: createRecipe,
  };
};

const get = async () => {
  const recipes = await recipesModel.get();
  return {
    status: OK,
    message: recipes,
  };
};

module.exports = { create, get };
