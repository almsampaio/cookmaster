const { ObjectId } = require('mongodb');
const Joi = require('joi');
const Recipes = require('../models/recipes');

const recipeJoi = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

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
  if (!ObjectId.isValid(id)) return { status: 404, err: { message: 'recipe not found' } };
  const recipe = await Recipes.getRecipeById(id);
  return { status: 200, data: recipe };
};

const update = async (id, data, userId) => {
  const check = ObjectId.isValid(id);
  if (!check) return { status: 404, err: { message: 'recipe not found' } };
  const recipe = await Recipes.update(id, data, userId);
  return { status: 200, data: recipe };
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  update,
};