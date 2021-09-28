const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipes-model');

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { status: 400, message: 'Invalid entries. Try again.' };
  }

  return false;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const validatingRecipe = validateRecipe(name, ingredients, preparation);

  if (validatingRecipe) return validatingRecipe;

  const createdRecipe = await recipesModel.create(
    name,
    ingredients,
    preparation,
    userId,
  );

  return {
    recipe: {
      ...createdRecipe,
    },
  };
};

const findRecipes = async () => {
  const recipes = await recipesModel.findRecipes();

  return recipes;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return { status: 404, message: 'recipe not found' };

  const recipe = await recipesModel.findById(id);
  if (!recipe) return { status: 404, message: 'recipe not found' };

  return recipe;
};

const updateRecipeById = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) return { status: 404, message: 'recipe not found' };

  const upRecipe = await recipesModel.updateRecipeById(
    id,
    name,
    ingredients,
    preparation,
  );

  if (!upRecipe) {
    return { status: 404, message: 'recipe not found' };
  }

  return upRecipe;
};

const deleteRecipeById = async (id) => {
  recipesModel.deleteRecipeById(id);
};

module.exports = {
  createRecipe,
  findRecipes,
  findById,
  updateRecipeById,
  deleteRecipeById,
};
