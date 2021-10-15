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

const updateRecipe = async (id, name, ingredients, preparation) => {
  const result = await recipesModel.updateRecipe(id, name, ingredients, preparation);
  return result;
};

const deleteRecipe = async (id) => {
  if (isValidId(id)) return;
  recipesModel.deleteRecipe(id);
};

const insertImageUrl = async (id, imagePath) => {
  const result = await recipesModel.insertImageUrl(id, imagePath);
  return result;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
  insertImageUrl,
};
