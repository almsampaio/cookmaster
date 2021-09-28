const createRecipeModel = require('./createRecipeModel');
const Recipe = require('../../entities/Recipe');

const createRecipeService = async (recipeInfo) => {
  const recipe = new Recipe(recipeInfo);
  const createdRecipe = await createRecipeModel(recipe);

  return createdRecipe;
};

module.exports = createRecipeService;
