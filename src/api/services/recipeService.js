const recipeModel = require('../models/recipeModel');
const recipeSchema = require('../schemas/recipeSchema');

const create = async (recipeData, userId) => {
  const validations = recipeSchema.validateRecipe(recipeData);
  if (validations.message) return validations;

  // console.log('service:', userId);
  
  const recipe = await recipeModel.create(recipeData, userId);
  return { status: 201, recipe };
};

const getAll = async () => {
  const recipes = await recipeModel.getAll();
  return { status: 200, recipes };
};

const getById = async (id) => {
  const validations = await recipeSchema.validateGetRecipe(id);
  if (validations.message) return validations;

  const recipe = await recipeModel.getById(id);
  return { status: 200, recipe };
};

module.exports = {
  create,
  getAll,
  getById,
};