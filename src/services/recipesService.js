const recipesModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => (
  recipesModel.createRecipe(name, ingredients, preparation, userId)
);

module.exports = { 
  createRecipe,
 }; 
