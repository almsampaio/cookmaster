const Joi = require('joi');
const AppError = require('../errors/AppError');
const RecipeModel = require('../models/RecipeModel');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const createRecipe = async (recipe) => {
  const { insertedId, ops: [insertedRecipe] } = await new RecipeModel()
    .insertOne(recipe);
  if (!insertedId) throw new AppError('Unknown Error', { message: 'Unknown Error' }, 500);
  
  return insertedRecipe;
};

const getRecipe = async (id) => new RecipeModel().findByObjectId(id);

const updateRecipe = async (query, recipe) => (
  await new RecipeModel().findAndUpdateByQuery(query, recipe)
).value;

const deleteRecipe = async (query) => new RecipeModel().deleteByQuery(query);

const getAllRecipes = async () => new RecipeModel().getAll();

module.exports = {
  recipeSchema,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipes,
};
