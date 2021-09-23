const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipesModel');

const RECIPE_NOT_FOUND = 'recipe not found';

const validatingData = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { status: 400, message: { message: 'Invalid entries. Try again.' } };
  }
  return false;
};

const create = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;
  const notValid = validatingData(name, ingredients, preparation);
  if (notValid) return notValid;
  const newRecipe = await recipesModel.create(name, ingredients, preparation, userId);
  return { status: 201, message: { recipe: newRecipe } };
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return { status: 200, message: recipes };
};

const getById = async (_id) => {
  if (!ObjectId.isValid(_id)) {
    return { status: 404, message: { message: RECIPE_NOT_FOUND } };
  }
  const recipe = await recipesModel.getById(_id);
  if (!recipe) {
    return { status: 404, message: { message: RECIPE_NOT_FOUND } };
  }
  return { status: 200, message: recipe };
};

const update = async (recipe, _id, userId, role) => {
  const { name, ingredients, preparation } = recipe;
  if (!ObjectId.isValid(_id)) {
    return { status: 404, message: { message: RECIPE_NOT_FOUND } };
  }
  const notValid = validatingData(name, ingredients, preparation);
  if (notValid) return notValid;
  const recipeToBeUpdated = await recipesModel.getById(_id);
  if (role !== 'admin' && userId !== recipeToBeUpdated.userId) {
    return { status: 401, message: { message: 'missing auth token' } };
  }
  const recipeUpdated = await recipesModel.update(name, ingredients, preparation, _id);
  return { status: 200, message: recipeUpdated };
};

const deleteOne = async (_id, userId, role) => {
  if (!ObjectId.isValid(_id)) {
    return { status: 404, message: { message: RECIPE_NOT_FOUND } };
  }
  const recipeToBeDeleted = await recipesModel.getById(_id);
  if (recipeToBeDeleted === null) return { status: 404, message: { message: RECIPE_NOT_FOUND } };
  if (role !== 'admin' && userId !== recipeToBeDeleted.userId) {
    return { status: 401, message: { message: 'missing auth token' } };
  }
  await recipesModel.deleteOne(_id);
  return { status: 204, message: '' };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteOne,
};
