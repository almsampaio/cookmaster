const recipesModel = require('../models/recipesModel');

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

const deleteById = async (id, user) => {
  const recipeExists = await findById(id);
  if (recipeExists.status === 404) {
    return recipeExists;
  }
  const { response: registredRecipe } = recipeExists;
  const { role, userId } = user;
  if (userId !== registredRecipe.userId && role !== 'admin') {
    return { response: { message: 'user not allowed' }, status: 401 };
  }
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

const update = async (recipe, user) => {
  const { id, name, ingredients, preparation } = recipe;
  const { userId, role } = user;
  const registredRecipe = await recipesModel.findById(id);
  if (!registredRecipe) {
    return { response: { message: 'recipe not found' }, status: 404 };
  }
  if (userId !== registredRecipe.userId && role !== 'admin') {
    return { response: { message: 'user not allowed' }, status: 401 };
  }
  await recipesModel.update(recipe);
  return {
    response: { _id: id, name, ingredients, preparation, userId: registredRecipe.userId },
    status: 200,
  };
};

module.exports = { getAll, findById, deleteById, create, update }; 