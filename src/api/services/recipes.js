const { ObjectId } = require('mongodb');
const { recipeCreation } = require('../schemas/recipes');
const CustomError = require('../../lib/CustomError');
const recipesModel = require('../models/recipes');

module.exports = {
  async get(id) {
    const recipeNotFound = () => { throw new CustomError(404, 'recipe not found'); };

    if (id && !ObjectId.isValid(id)) recipeNotFound();
    const recipesOrRecipe = await recipesModel.get(id);
    if (!recipesOrRecipe) recipeNotFound();
    return recipesOrRecipe;
  },

  async create(recipe, user) {
    const recipeSchemaError = recipeCreation.validate(recipe).error;
    
    if (recipeSchemaError) throw new CustomError(400, recipeSchemaError.message);
    return recipesModel.create(recipe, user);
  },
};
