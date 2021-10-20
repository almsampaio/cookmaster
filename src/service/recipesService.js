const Joi = require('joi');
const { ObjectId } = require('mongodb');
const recipesModel = require('../model/recipesModel');
const { validateError } = require('./errorValidate');

const validationSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const createRecipe = async (recipe, id) => {
  const { error } = validationSchema.validate(recipe);
  if (error) throw validateError(400, 'Invalid entries. Try again.');
  return recipesModel.registerRecipe({ ...recipe, userId: id });
};

const getAllRecipes = async () => recipesModel.findRecipes();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return recipesModel.findRecipeById(id);
};

const recipeUpdate = async (id, recipe) => {
  if (!ObjectId.isValid(id)) return null;
  return recipesModel.updateRecipe(id, recipe);
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return recipesModel.deleteOne(id);
};

const addImage = async (id) => {
  const imagePath = `localhost:3000/src/uploads/${id}.jpeg`;
  return recipesModel.updateImage(id, imagePath);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  recipeUpdate,
  deleteById,
  addImage,
};  