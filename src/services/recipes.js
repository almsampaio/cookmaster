const model = require('../models/recipes');

const createRecipes = async (name, ingredients, preparation, userId) => {
    const createdRecipe = await model.createRecipes(name, ingredients, preparation, userId);
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

const updateRecipes = async (id, name, ingredients, preparation) => {
  const updatedRecipes = await model.updateRecipes(id, name, ingredients, preparation);
  if (!updatedRecipes) {
    return ({ message: 'recipe not found' });
  }
  return updatedRecipes;
};

module.exports = { createRecipes, findRecipes, findRecipesById, updateRecipes };
