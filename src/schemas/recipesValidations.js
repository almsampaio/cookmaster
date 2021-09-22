const validateRecipeInfos = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return {
      errorCode: 400,
      errorInfo: { message: 'Invalid entries. Try again.' },
    };
  }
  return {};
};

module.exports = {
  validateRecipeInfos,
};