const { ObjectId } = require('mongodb');
const { recipeCreation } = require('../schemas/recipes');
const CustomError = require('../../lib/CustomError');
const recipesModel = require('../models/recipes');

const errorRecipeNotFound = () => { throw new CustomError(404, 'recipe not found'); };

module.exports = {
  async get(id) {
    if (id && !ObjectId.isValid(id)) errorRecipeNotFound();
    const recipesOrRecipe = await recipesModel.get(id);
    if (!recipesOrRecipe) errorRecipeNotFound();
    return recipesOrRecipe;
  },

  async create(recipe, user) {
    const recipeSchemaError = recipeCreation.validate(recipe).error;
    
    if (recipeSchemaError) throw new CustomError(400, recipeSchemaError.message);
    return recipesModel.create(recipe, user);
  },

  async update(id, updatesForRecipe) {
    if (id && !ObjectId.isValid(id)) errorRecipeNotFound();

    const recipeUpdated = await recipesModel.update(id, updatesForRecipe);
    return recipeUpdated;
  },
};
