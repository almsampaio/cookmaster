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

module.exports = {
  addRecipe,
};