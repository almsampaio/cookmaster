const Validation = require('./constructor');

function isIngredientsValid(ingredients) {
  const isIngredientsTrue = new Validation(!!ingredients);
  isIngredientsTrue.verify('badRequest');
}

function isPreparationValid(preparation) {
  const isPreparationTrue = new Validation(!!preparation);
  isPreparationTrue.verify('badRequest');
}

module.exports = {
  isIngredientsValid,
  isPreparationValid,
};
