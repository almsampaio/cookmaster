const userModel = require('../models/recipesModel');

const createRecipe = async (userId, name, ingredients, preparation) => {
  const result = await userModel.createRecipe(userId, name, ingredients, preparation);
  return result;
};

module.exports = {
  createRecipe,
};