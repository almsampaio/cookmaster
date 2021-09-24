const { middlewaresRecipes } = require('../middlewares');

const fieldsRecipes = [
  middlewaresRecipes.checkFieldName,
  middlewaresRecipes.checkFieldIngredients,
  middlewaresRecipes.checkFieldPreparation,
  middlewaresRecipes.checkToken,
];

module.exports = { fieldsRecipes };
