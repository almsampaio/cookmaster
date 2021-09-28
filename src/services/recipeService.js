const recipeModel = require('../models/recipeModel');

const create = async (recipe, userId) => {
  const { name = '', ingredients = '', preparation = '' } = recipe;
  
  if (!name || !ingredients || !preparation) {
 return {
    code: 400,
    message: 'Invalid entries. Try again.',
  }; 
}

  const createdRecipe = await recipeModel.create(recipe, userId);
  return { createdRecipe };
};

const getAll = async () => {
  const recipes = await recipeModel.getAll();
  return recipes;
};

const find = async (id) => {
  const recipe = await recipeModel.find(id);

  if (!recipe) return { code: 404, message: 'recipe not found' };

  return { recipe };
};

const edit = async (recipe, id) => {
  const editedRecipe = await recipeModel.edit(recipe, id);
  return editedRecipe;
};

const remove = async (id) => {
  const deletedRecipe = await recipeModel.remove(id);
  
  if (!deletedRecipe) return { code: 404, message: 'invalid ID' };

  return { code: 204 };
};

const addImage = async (id, image) => {
  const recipe = await recipeModel.addImage(id, image);

  return { code: 200, recipe };
};

module.exports = {
  create,
  getAll,
  find,
  edit,
  remove,
  addImage,
};
