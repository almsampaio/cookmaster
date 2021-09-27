const recipesModel = require('../models/recipesModel');

const validateUser = async (recipeId, userId, role) => {
  const registeredRecipe = await recipesModel.findById(recipeId);
  if (!registeredRecipe) {
    return { response: { message: 'recipe not found' }, status: 404 };
  }
  if (userId !== registeredRecipe.userId && role !== 'admin') {
    return { response: { message: 'user not allowed' }, status: 401 };
  }
  return { isValid: true, onerUserId: registeredRecipe.userId };
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
};

const findById = async (id) => {
  const recipe = await recipesModel.findById(id);
  if (!recipe) {
    return {
      response: {
        message: 'recipe not found',
      },
      status: 404,
    };
  }
  return {
    response: recipe,
    status: 200,
  };
};

const deleteById = async (id) => {
  await recipesModel.deleteById(id);
  return {
    response: null,
    status: 204,
  };
};

const create = async (name, ingredients, preparation, userId) => {
  const createdRecipe = await recipesModel.create(name, ingredients, preparation, userId);
  return createdRecipe;
};

const update = async (recipe) => {
  await recipesModel.update(recipe);
  return {
    response: recipe,
    status: 200,
  };
};

const registerImage = async (id, filename) => {
  const recipe = await recipesModel.findById(id);
  const imagePath = `localhost:3000/src/uploads/${filename}`;
  await recipesModel.registerImage(id, imagePath);
  return {
    status: 200,
    response: { ...recipe, image: imagePath },
  };
};

module.exports = { getAll, findById, deleteById, create, update, validateUser, registerImage }; 