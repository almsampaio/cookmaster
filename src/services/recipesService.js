const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');
const CustomError = require('../utils/CustomError');

const segredo = 'bem-te-vi';
const RECIPE_ERROR = 'recipe not found'; 

const validateFields = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    throw new CustomError(400, 'Invalid entries. Try again.');
  }
};

const getRecipes = async () => {
  const response = await recipesModel.getRecipes();
  return ({ status: 200, response });
};

const updateRecipe = async (allEntries) => {
  const { id, name, ingredients, preparation, user } = allEntries;
  const { _id, role } = user;

  if (!ObjectId.isValid(id)) throw new CustomError(404, RECIPE_ERROR);

  const recipe = await recipesModel.getRecipeById(id);
  if (JSON.stringify(recipe.userId) !== JSON.stringify(_id) && role !== 'admin') {
    throw new CustomError(401, 'missing auth token');
  } else {
    const response = await recipesModel
      .updateRecipe({ id, name, ingredients, preparation, userId: recipe.userId });
    return { status: 200, response };
  }
};

const insertImage = async (id, path, { _id, role }) => {
  if (!ObjectId.isValid(id)) throw new CustomError(404, RECIPE_ERROR);

  const recipe = await recipesModel.getRecipeById(id);
  if (JSON.stringify(recipe.userId) !== JSON.stringify(_id) && role !== 'admin') {
    throw new CustomError(401, 'missing auth token');
  } else {
    const response = await recipesModel
      .insertImage(id, path);
    return { status: 200, response };
  }
};

const deleteRecipe = async (id, { _id, role }) => {
  if (!ObjectId.isValid(id)) throw new CustomError(404, RECIPE_ERROR);

  const recipe = await recipesModel.getRecipeById(id);
  if (!recipe) throw new CustomError(404, RECIPE_ERROR);

  if (JSON.stringify(recipe.userId) !== JSON.stringify(_id) && role !== 'admin') {
    throw new CustomError(401, 'missing auth token');
  } else {
    await recipesModel
      .deleteRecipe(id);
    return { status: 204 };
  }
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) throw new CustomError(404, RECIPE_ERROR);
  const response = await recipesModel.getRecipeById(id);
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
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};
