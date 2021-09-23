const model = require('../models/recipesModel');

const newRecipe = async ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) {
    return ({ status: 400, message: 'Invalid entries. Try again.' });
  }

  const recipe = await model.newRecipe(name, ingredients, preparation);

  return recipe;
};

module.exports = {
  newRecipe,
};
