const recipesModel = require('../models/recipes-model');

const validateRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { status: 400, message: 'Invalid entries. Try again.' }; 
  }

  return false;
};

const createRecipe = async (name, ingredients, preparation, userId) => {
  const validatingRecipe = validateRecipe(name, ingredients, preparation);

  if (validatingRecipe) return validatingRecipe;

  const createdRecipe = await recipesModel.create(name, ingredients, preparation, userId);

  return { recipe: {
    ...createdRecipe,
  } };
};

module.exports = { createRecipe };