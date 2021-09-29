const recipesModels = require('../models/recipesModel');
const validate = require('../middlewares/recipesValidation');

const createRecipe = async (name, ingredients, preparation, userID) => {
  const validateRecipe = await validate.validateRecipe(name, ingredients, preparation);
  if (validateRecipe) return validateRecipe;

  const create = await recipesModels.createRecipe(name, ingredients, preparation, userID);
  console.log(create);
  return {
    recipe: {
      ...create,
    },
  };
};

module.exports = {
  createRecipe,
};