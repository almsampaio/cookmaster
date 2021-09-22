const { recipeCreation } = require('../schemas/recipes');
const CustomError = require('../../lib/CustomError');
const recipesModel = require('../models/recipes');

module.exports = {
  async get(id) {
    return recipesModel.get(id);
  },

  async create(recipe, user) {
    const recipeSchemaError = recipeCreation.validate(recipe).error;
    
    if (recipeSchemaError) throw new CustomError(400, recipeSchemaError.message);
    return recipesModel.create(recipe, user);
  },
};
