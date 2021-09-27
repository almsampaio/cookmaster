const { ObjectId } = require('mongodb');
const { recipeCreation } = require('../schemas/recipes');
const CustomError = require('../../lib/CustomError');
const recipesModel = require('../models/recipes');

const errorRecipeNotFound = () => { throw new CustomError(404, 'recipe not found'); };
const errorIfUserNotAllowed = (user, recipe) => { 
  if (user.role !== 'admin' && recipe.userId !== user.id) {
    throw new CustomError(401, 'not allowed');
  }
};

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

  async update(id, req) {
    if (id && !ObjectId.isValid(id)) errorRecipeNotFound();

    const foundRecipe = await recipesModel.get(id);

    errorIfUserNotAllowed(req.user, foundRecipe);

    const recipeUpdated = await recipesModel.update(id, req.body, req.file);
    return recipeUpdated;
  },

  async delete(id, user) {
    if (id && !ObjectId.isValid(id)) errorRecipeNotFound();

    const foundRecipe = await recipesModel.get(id);

    errorIfUserNotAllowed(user, foundRecipe);

    const recipeDeleted = await recipesModel.delete(id, user);
    return recipeDeleted;
  },
};
