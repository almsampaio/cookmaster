const model = require('../models/recipes');

const createRecipes = async (name, ingredients, preparation, _id) => {
    const createdRecipe = await model.createRecipes(name, ingredients, preparation, _id);
    if (!createdRecipe) {
        return ({ message: 'Incorrect username or password' });
    }
    return createdRecipe;
};

const findRecipes = async () => {
  const recipes = await model.findRecipes();
  if (!recipes) {
    return ({ message: 'Not recipes' });
}
  return recipes;
};

const findRecipesById = async (id) => {
  const recipe = await model.findRecipesById(id);
  if (!recipe) {
    return ({ message: 'recipe not found' });
  }
  return recipe;
};

module.exports = { createRecipes, findRecipes, findRecipesById };
