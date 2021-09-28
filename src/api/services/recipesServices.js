const recipesModel = require('../model/recipesModel');
const { CREATED } = require('../utils/status');

const create = async (recipe) => {
  const createRecipe = await recipesModel.create(recipe);
  return {
    status: CREATED,
    message: createRecipe,
  };
};

module.exports = { create };
