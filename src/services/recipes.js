const RecipesModels = require('../models/recipes');
const validation = require('./validation');

const create = async (recipe) => {
  const { name, ingredients, preparation } = recipe;
  const validate = validation.validateRecipeInfo(name, ingredients, preparation);
  if (validate) return validate;
  const newRecipe = await RecipesModels.create(recipe);
  return {
    recipe: {
      ...newRecipe.ops[0],
    },
  };
};

module.exports = {
  create,
};
