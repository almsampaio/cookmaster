const Validation = require('./constructor');

function isIngredientsValid(ingredients) {
  const isIngredientsTrue = new Validation(!!ingredients);
  isIngredientsTrue.verify('badRequest');
}

function isPreparationValid(preparation) {
  const isPreparationTrue = new Validation(!!preparation);
  isPreparationTrue.verify('badRequest');
}

function isRecipeFound(recipe, customMessage) {
  const isRecipeTrue = new Validation(!!recipe);
  isRecipeTrue.verify('notFound', customMessage);
}

module.exports = {
  isIngredientsValid,
  isPreparationValid,
  isRecipeFound,
};
