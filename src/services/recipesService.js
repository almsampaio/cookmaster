const jwt = require('jsonwebtoken');
const recipesModel = require('../models/recipesModel');
const CustomError = require('../utils/CustomError');

const segredo = 'bem-te-vi';

const validateFields = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new CustomError(400, 'Invalid entries. Try again.');
  }
};

const getRecipes = async () => {
  const response = await recipesModel.getRecipes();
  return ({ status: 200, response });
};

const createRecipe = async (nome, ingredientes, preparacao, token) => {
  validateFields(nome, ingredientes, preparacao);
  const { data: { _id } } = jwt.verify(token, segredo);
  const recipe = await recipesModel
    .createRecipe(nome, ingredientes, preparacao, _id);
  
  return ({ status: 201, message: recipe });
};
// throw new CustomError(401, 'XABLAUU');
module.exports = {
  createRecipe,
  getRecipes,
};
