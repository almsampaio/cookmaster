const { ObjectId } = require('mongodb');
const RecipesModels = require('../models/recipes');
const validation = require('../utils/validation');

const create = async (nameRecipe, ingredientsRecipe, preparationRecipe, user) => {
  const validate = validation
    .validateEntriesRecipes(nameRecipe, ingredientsRecipe, preparationRecipe);
  if (validate) return validate;

  const result = await RecipesModels.create(nameRecipe, ingredientsRecipe, preparationRecipe, user);
  const newRecipe = result.ops[0];
  const { name, ingredients, preparation, _id, userId } = newRecipe;
  return { recipe: { name, ingredients, preparation, _id, userId } };
};

const getById = async (id) => {
  const objError = { code: 404, message: 'recipe not found' };
  if (!ObjectId.isValid(id)) return objError;
  const recipe = await RecipesModels.getById(id);
  if (!recipe) return objError;
  return recipe;
};

module.exports = {
  create,
  getById,
};
