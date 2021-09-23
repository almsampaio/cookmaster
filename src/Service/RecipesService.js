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

const isValidToken = (token) => {
  if (!token) {
    throw new Error('missing auth token');
  }
};

const editRecipe = async (id, token, data) => {
  isValidId(id);
  isValidToken(token);
  const { data: { _id } } = jwt.verify(token, secret);
  const upRecipe = await RecipesModel.edition(data, _id, id);
  return upRecipe;
};

module.exports = { recipeRegistration, listAllReceipes, listRecipeById, editRecipe };