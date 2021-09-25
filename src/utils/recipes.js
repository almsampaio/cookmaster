const { middlewaresRecipes } = require('../middlewares');

const fieldsRecipes = [
  middlewaresRecipes.checkFieldName,
  middlewaresRecipes.checkFieldIngredients,
  middlewaresRecipes.checkFieldPreparation,
  middlewaresRecipes.checkToken,
];

const recipeNotExist = [middlewaresRecipes.checkExistRecipe];

module.exports = {
  fieldsRecipes,
  recipeNotExist,
};
