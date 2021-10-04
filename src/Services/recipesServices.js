const recipesModel = require('../Model/recipesModel');

const invalidEntries = { status: 400, message: 'Invalid entries. Try again.' };

const createRecipe = async (userId, name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return invalidEntries;
  const create = await recipesModel.createRecipe(userId, name, ingredients, preparation);
  return ({ status: 201, recipe: create });
};

module.exports = {
  createRecipe,
};
