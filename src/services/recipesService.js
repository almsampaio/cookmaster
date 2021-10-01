const recipes = require('../models/recipesModel');
const recipeSchema = require('../schema/recipesSchema');

const addRecipe = async (recipeInfo) => {
 // console.log(recipeInfo);
  const { error } = recipeSchema.validate(recipeInfo);
  if (error) {
 return {
    err: {
      message: 'Invalid entries. Try again.',
      status: 400,
    },
  }; 
}

  const newRecipe = await recipes.addRecipe(recipeInfo);
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipesList = await recipes.getAllRecipes();
  return recipesList;
};

module.exports = {
  addRecipe,
  getAllRecipes,
};