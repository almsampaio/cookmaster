const err = {
  fieldRequired: 'Invalid entries. Try again.',
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

module.exports = {
  validateName,
  validateIngredients,
  validatePreparation,
};
