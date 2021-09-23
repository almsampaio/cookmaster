const errorGenerator = require('../utils/errorGenerator');
const errorMsg = require('../utils/errorMessages');

const validateRecipeCreation = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    const errorMessage = errorGenerator(errorMsg.invalidEntries);
    return { errorMessage };
  }
};

module.exports = {
  validateRecipeCreation,
};
