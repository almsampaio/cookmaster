const recipeModel = require('../models/recipeModel');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const validateEntries = (name, ingredients, preparation) => {
  const invalidEntriesError = { err: { code: 400, message: 'Invalid entries. Try again.' } };
  if (!name || !ingredients || !preparation) {
  return invalidEntriesError;
}
  return null;
};

const create = async (name, ingredients, preparation, userId) => {
  const invalidEntries = validateEntries(name, ingredients, preparation);
  if (invalidEntries) return invalidEntries;
  const insertedRecipe = await recipeModel.create(name, ingredients, preparation, userId);
  return { newRecipe: insertedRecipe, status: HTTP_CREATED_STATUS };
};

const getAll = async () => {
  const recipes = await recipeModel.getAll();
  return { recipesList: recipes, status: HTTP_OK_STATUS };
};

const getById = async (id) => {
  const notFoundError = { err: { code: 404, message: 'recipe not found' } };
  const recipe = await recipeModel.getById(id);
  if (!recipe) return notFoundError;
  return { recipeById: recipe, status: HTTP_OK_STATUS };
  };

const update = async (recipeData) => {
  const { id, name, ingredients, preparation, userId } = recipeData;
  const notFoundError = { err: { code: 404, message: 'recipe not found' } };
  const recipe = await recipeModel.update({ id, name, ingredients, preparation, userId });
  if (!recipe) return notFoundError;
  return { updatedRecipe: recipe, status: HTTP_OK_STATUS };
  };  
  
module.exports = {
  create,
  getAll,
  getById,
  update,
};
