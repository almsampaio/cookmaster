const recipesModel = require('../models/recipes');

const createRecipes = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.createRecipes(name, ingredients, preparation, userId);

  return { recipe };
};

const getAll = async () => {
  const allRecipes = await recipesModel.getAll();
  
  return allRecipes;
};

const getRecipe = async (id) => {
  const recipe = await recipesModel.getRecipe(id);
  
  if (!recipe) return ({ code: 404, message: 'recipe not found' });
  
  return recipe;
};

const editRecipe = async (id, body) => {
  const newRecipe = await recipesModel.editRecipe(id, body);
    
  return newRecipe;
};

const deleteRecipe = async (id) => {
  await recipesModel.deleteRecipe(id);
  
  return null;
};
  
const addImage = async (id, image) => {
  const newRecipe = await recipesModel.addImage(id, image);
  
  return newRecipe;
};

module.exports = {
  createRecipes,
  getAll,
  getRecipe,
  editRecipe,
  addImage,
  deleteRecipe,
};
