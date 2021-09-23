const recipeModel = require('../models/recipesModel');

const newRecipe = async ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) {
    return ({ status: 400, message: 'Invalid entries. Try again.' });
  }

  const recipe = await recipeModel.newRecipe(name, ingredients, preparation);

  return recipe;
};

const getRecipes = async () => recipeModel.getRecipes();

const getRecipe = async (id) => recipeModel.getRecipe(id);

const editRecipe = async (id, body) => recipeModel.editRecipe(id, body);

const deleteRecipe = async (id, body) => {
  if (body.role === 'admin') {
    return recipeModel.editRecipe(id);
  }
};

const insertImage = async (filename, id) => {
  console.log(filename);
  return recipeModel.insertImage(filename, id);
};

module.exports = {
  newRecipe,
  getRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  insertImage,
};
