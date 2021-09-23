const jwt = require('jsonwebtoken');
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

module.exports = { recipeRegistration, listAllReceipes };