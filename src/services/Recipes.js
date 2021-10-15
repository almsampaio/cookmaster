const { isValidId } = require('../middlewares/Recipes');
const recipesModel = require('../models/Recipes');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const result = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  return result;
};

const getAll = () => recipesModel.getAll();

const getById = async (id) => {
  if (isValidId(id)) return;
  const result = await recipesModel.getById(id);
  return result;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
};
