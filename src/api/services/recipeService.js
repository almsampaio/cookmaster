const recipeModel = require('../models/recipeModel');
const recipeSchema = require('../schemas/recipeSchema');

const create = async (recipeData, userId) => {
  const validations = recipeSchema.validateRecipe(recipeData);
  if (validations.message) return validations;
  
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

const update = async (id, name, ingredients, preparation) => {
  const recipe = await recipeModel.update(id, name, ingredients, preparation);
  return { status: 200, recipe };
};

const updateImage = async ({ id, image }) => {
  const recipe = await recipeModel.updateImage(id, image);
  return { status: 200, recipe };
};

const exclude = async (id) => {
  await recipeModel.exclude(id);
  return { status: 204 };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  updateImage,
  exclude,
};