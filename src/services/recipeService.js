const recipeModel = require('../models/recipeModel');

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
  const HTTP_CREATED_STATUS = 201;
  return { newRecipe: insertedRecipe, status: HTTP_CREATED_STATUS };
};

module.exports = {
  create,
};
