const { middlewaresRecipes } = require('../middlewares');

const fieldsRecipes = [
  middlewaresRecipes.checkFieldName,
  middlewaresRecipes.checkFieldIngredients,
  middlewaresRecipes.checkFieldPreparation,
  middlewaresRecipes.checkToken,
];

const recipeNotExist = [middlewaresRecipes.checkExistRecipe];

const checkEdit = [
  middlewaresRecipes.checkExistToken,
  middlewaresRecipes.checkToken,
];

module.exports = {
  fieldsRecipes,
  recipeNotExist,
  checkEdit,
};
