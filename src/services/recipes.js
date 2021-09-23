const { ObjectId } = require('mongodb');
const Joi = require('joi');
const Recipes = require('../models/recipes');

const recipeJoi = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const error404Menssage = { status: 404, err: { message: 'recipe not found' } };

const create = async (data, userId) => {
  const { error } = recipeJoi.validate(data);
  if (error) return { status: 400, err: { message: 'Invalid entries. Try again.' } };
  const recipe = await Recipes.create(data, userId);
  return { status: 201, data: { recipe } };
};

const getAllRecipes = async () => {
  const recipes = await Recipes.getAllRecipes();
  return { status: 200, data: recipes };
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return error404Menssage;
  const recipe = await Recipes.getRecipeById(id);
  return { status: 200, data: recipe };
};

const updateRecipe = async (id, data, userId) => {
  if (!ObjectId.isValid(id)) return error404Menssage;
  const recipe = await Recipes.updateRecipe(id, data, userId);
  return { status: 200, data: recipe };
};

const removeRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return error404Menssage;
  await Recipes.removeRecipe(id);
  return { status: 204 };
};

const addRecipeImage = async (id, filename) => {
  if (!ObjectId.isValid(id)) return error404Menssage;
  const img = `localhost:3000/src/uploads/${filename}`;
  await Recipes.addRecipeImage(id, img);
  const recipe = await Recipes.getRecipeById(id);
  return { status: 200, data: recipe };
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  removeRecipe,
  addRecipeImage,
};