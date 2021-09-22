const model = require('../models/recipes');

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const recipe = await model.createRecipe({ name, ingredients, preparation, userId });
  return recipe;
};

const getAllRecipes = async () => {
  const recipes = await model.getAllRecipes();
  return recipes;
};

const getRecipeById = async (id) => {
  const recipe = await model.getRecipeById(id);

  if (!recipe) return { error: { code: 404, message: 'recipe not found' } };

  return recipe;
};

const updateRecipe = async (payload) => {
  const { role, recipeId, userId } = payload;
  const recipe = await getRecipeById(recipeId);
  if (recipe.error) return recipe;

  if (`${userId}` === `${recipe.userId}` || role === 'admin') {
    const updatedRecipe = await model.updateRecipe(payload);
    return updatedRecipe;
  }
  return { error: { code: 401, message: 'You have no permission' } };
};

const deleteRecipe = async (id) => {
  const recipe = await getRecipeById(id);
  if (recipe.error) return recipe;

  const response = await model.deleteRecipe(id);
  return response;
};

const addImage = async (payload) => {
  const { recipeId, loggedUserId, role } = payload;
  const recipe = await getRecipeById(recipeId);

  if (recipe.error) return recipe;

  if (`${loggedUserId}` === `${recipe.userId}` || role === 'admin') {
    const imgUrl = `localhost:3000/src/uploads/${recipeId}.jpeg`;
    const response = await model.addImage(recipeId, imgUrl);
    return response;
  }
    return { error: { code: 401, message: 'You have no permission' } };
  };

  module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    addImage,
  };
