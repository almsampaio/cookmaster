const { ObjectId } = require('mongodb');
const recipeModel = require('../models/recipeModel');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;

const INVALID_ENTRIES = 'Invalid entries. Try again.';
const RECIPE_NOT_FOUND = 'recipe not found';

const createRecipe = async (recipeData, userId) => {
  const { name, ingredients, preparation } = recipeData;

  if (!name || !ingredients || !preparation) {
    return { status: BAD_REQUEST, message: INVALID_ENTRIES };
  }

  const recipe = await recipeModel.createRecipe(recipeData, userId);
  return { status: STATUS_CREATED, recipe };
};

const getAll = async () => {
  const result = await recipeModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await recipeModel.getById(id);
  return result;
};

const editRecipe = async (id, data, idUser) => {
  const checked = ObjectId.isValid(id);
  if (!checked) return { status: STATUS_NOT_FOUND, err: { message: RECIPE_NOT_FOUND } };

  const recipe = await recipeModel.editRecipe(id, data, idUser);
  return { status: STATUS_OK, data: recipe };
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  editRecipe,
};
