const recipeModel = require('../models/recipeModel');

const mandatoryCreate = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return true;
};

const recipeExists = async (id) => {
  const recipe = await recipeModel.recipeId(id);
  if (!recipe) return true;
};

const invalidEntries = {
  message: 'Invalid entries. Try again.',
};

const invalidRecipe = {
  message: 'recipe not found',
};

const validateEntries = (name, ingredients, preparation) => {
  switch (true) {
  case mandatoryCreate(name, ingredients, preparation): 
  return { code: 400, message: invalidEntries };
  default: return {};
  }
};

const validateRecipe = async (id) => {
  switch (true) {
  case (await recipeExists(id)): return { code: 404, message: invalidRecipe };
  default: return {}; 
}
};

module.exports = { 
  validateEntries,
  validateRecipe,
};