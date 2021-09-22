const recipeModel = require('../models/recipes');

const INVALID = 'Invalid entries. Try again.';

const checkRecipe = (name, ingredients, preparation) => {
  if (typeof name !== 'string') return { message: INVALID, error: 400 };
  if (typeof ingredients !== 'string') return { message: INVALID, error: 400 };
  if (typeof preparation !== 'string') return { message: INVALID, error: 400 };
  return false;
};

const addRecipe = async (recipe) => {
  const { name, ingredients, preparation, authorId } = recipe;

  const check = checkRecipe(name, ingredients, preparation);
  if (check) return check;

  const newRecipe = { name, ingredients, preparation, authorId };
  const insertedRecipe = await recipeModel.addRecipe(newRecipe);

  return insertedRecipe;
};

module.exports = {
  addRecipe,
};