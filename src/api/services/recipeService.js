const Recipe = require('../models/Recipe');
const AppError = require('../utils/AppError');

exports.create = async ({ name, ingredients, preparation, userId }) => {
  if (!name || !ingredients || !preparation) {
    throw new AppError(400, 'Invalid entries. Try again.');
  }

  const recipe = await Recipe.create({ name, ingredients, preparation, userId });

  return recipe;
};

exports.getAll = async () => {
  const recipes = await Recipe.getAll();

  return recipes;
};

exports.getById = async (id) => {
  const recipe = await Recipe.getById(id);

  if (!recipe) throw new AppError(404, 'recipe not found');

  return recipe;
};

const verifyAuthorizedUser = async (user, recipeId) => {
  const recipe = await exports.getById(recipeId);

  if (recipe.userId === user.userId || user.role === 'admin') return true;

  return false;
};

exports.update = async ({ id, name, ingredients, preparation, user }) => {
  const isUserAuthorized = await verifyAuthorizedUser(user, id);

  if (!isUserAuthorized) throw new AppError(401, 'User not authorized');

  await Recipe.update({ id, name, ingredients, preparation });

  const updatedRecipe = await Recipe.getById(id);

  return updatedRecipe;
};

exports.setImage = async ({ id, imagePath, user }) => {
  const isUserAuthorized = await verifyAuthorizedUser(user, id);

  if (!isUserAuthorized) throw new AppError(401, 'User not authorized');

  await Recipe.setImage({ id, imagePath });

  const updatedRecipe = await Recipe.getById(id);

  return updatedRecipe;
};

exports.delete = async ({ user, id }) => {
  const isUserAuthorized = await verifyAuthorizedUser(user, id);

  if (!isUserAuthorized) throw new AppError(401, 'User not authorized');

  const deletedProduct = await Recipe.delete(id);

  if (!deletedProduct) throw new AppError(404, 'Invalid Recipe');

  return deletedProduct;
};
