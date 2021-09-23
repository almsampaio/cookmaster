const jwt = require('jsonwebtoken');
const { ObjectId } = require('bson');
const UsersModel = require('../Model/UsersModel');
const RecipesModel = require('../Model/RecipesModel');

const secret = 'projectcookmaster';

const recipeRegistration = async (data, token) => {
  const decode = jwt.verify(token, secret);
  const { _id } = await UsersModel.searchByEmail(decode.data.email);
  const newRecipe = await RecipesModel.registration(_id, data);
  return newRecipe;
};

const listAllReceipes = () => RecipesModel.getAllRecipes();

const isValidId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error('recipe not found');
  }
};

const findById = async (id) => {
  const recipe = await RecipesModel.getById(id);
  if (!recipe) {
    throw new Error('recipe not found');
  }
};

const listRecipeById = async (id) => {
  isValidId(id);
  await findById(id);
  return RecipesModel.getById(id);
};

module.exports = { recipeRegistration, listAllReceipes, listRecipeById };