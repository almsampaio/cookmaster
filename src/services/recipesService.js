const recipesModel = require('../models/recipesModel');
const validations = require('./validations');

async function register(recipe, token) {
  validations.isNameValid(recipe.name);
  validations.isIngredientsValid(recipe.ingredients);
  validations.isPreparationValid(recipe.preparation);

  const { _id: userId } = validations.isTokenValid(token);

  const insertedId = await recipesModel.register({ ...recipe, userId });

  return {
    userId,
    _id: insertedId,
  };
}

module.exports = {
  register,
};
