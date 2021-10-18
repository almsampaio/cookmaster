const err = {
  fieldRequired: 'Invalid entries. Try again.',
  notFoundRecipe: 'recipe not found',
};

const validateName = (nome) => {
  if (!nome) return { message: err.fieldRequired };
};

const validateIngredients = (ingredients) => {
  if (!ingredients) return { message: err.fieldRequired };
};

const validatePreparation = (preparation) => {
  if (!preparation) return { message: err.fieldRequired };
};

const validateId = (id) => {
  if (!id) return { message: err.notFoundRecipe };
  return false;
};

module.exports = {
  validateName,
  validateIngredients,
  validatePreparation,
  validateId,
};
