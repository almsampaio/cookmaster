const recipeCollection = require('../../database/recipesCollection');

const createRecipeModel = async (recipe) => {
  const collection = await recipeCollection();
  const createdRecipe = await collection.insertOne(recipe);

  return createdRecipe;
};

module.exports = createRecipeModel;
