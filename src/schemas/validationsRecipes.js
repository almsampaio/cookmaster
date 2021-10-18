const err = {
  fieldRequired: 'Invalid entries. Try again.',
};

const validateName = (nome) => {
  if (!nome) return { message: err.fieldRequired };
};

module.exports = {
  validateName,
};
