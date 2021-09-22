const recipesModel = require('../models/recipesModel');

const validatingData = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { status: 400, message: { message: 'Invalid entries. Try again' } };
  }
  return false;
};

const create = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;
  const notValid = validatingData(name, ingredients, preparation);
  if (notValid) return notValid;
  const newRecipe = await recipesModel.create(name, ingredients, preparation, userId);
  return { status: 201, message: { recipe: newRecipe } };
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return { status: 200, message: recipes };
};

module.exports = {
  create,
  getAll,
};
