const { ObjectId } = require('mongodb');
const recipeModel = require('../models/RecipeModel');

const URL = 'localhost:3000';

const createRecipe = async (recipeData, userId) => {
  const { name, ingredients, preparation } = recipeData;

  if (!name || !ingredients || !preparation) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }

  const recipe = await recipeModel.createRecipe(recipeData, userId);

  return { status: 201, recipe };
};

const getAll = async () => {
  const result = await recipeModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await recipeModel.getById(id);
  return result;
};

const updateRecipe = async (id, data, idUser) => {
  const checked = ObjectId.isValid(id);
  if (!checked) return { status: 404, err: { message: 'recipe not found' } };

  const recipe = await recipeModel.updateRecipe(id, data, idUser);
  return { status: 200, data: recipe };
};

const removeRecipe = async (id) => {
  const checked = ObjectId.isValid(id);
  if (!checked) return { status: 404, err: { message: 'recipe not found' } };

  await recipeModel.removeRecipe(id);
  return { status: 204 };
};

const updateImage = async (id, image) => {
  const checked = ObjectId.isValid(id);
  if (!checked) return { status: 404, err: { message: 'recipe not found' } };

  const imagePath = `${URL}/src/uploads/${image}`;
  const result = await recipeModel.updateImage(id, imagePath);

  return { status: 200, data: result };
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  removeRecipe,
  updateImage,
};
