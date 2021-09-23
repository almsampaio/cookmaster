const { ObjectId } = require('mongodb');
const RecipesModels = require('../models/recipes');
const validation = require('./validation');

const create = async (recipe) => {
  const { name, ingredients, preparation } = recipe;
  const validate = validation.validateRecipeInfo(name, ingredients, preparation);
  if (validate) return validate;
  const newRecipe = await RecipesModels.create(recipe);
  return {
    recipe: {
      ...newRecipe.ops[0],
    },
  };
};

const getAll = async () => {
  const recipes = await RecipesModels.getAll();
  return recipes;
};

const getById = async (id) => {
  const objError = {
    code: 404,
    message: 'recipe not found',
  };
  if (!ObjectId.isValid(id)) return objError;
  const recipe = await RecipesModels.getById(id);
  if (!recipe) return objError;
  return recipe;
};

const updateRecipe = async (recipe) => {
  await RecipesModels.updateRecipe(recipe);
  const { _id } = recipe;
  const getRecipe = await getById(_id);
  return {
    code: 200,
    recipe: getRecipe,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  updateRecipe,
};
