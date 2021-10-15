const Joi = require('joi');
const { ObjectId } = require('mongodb');

const validateRecipeBody = (name, ingredients, preparation) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });

  if (error) throw error;
};

const isValidRecipe = (recipe) => {
  if (!recipe) {
    const error = new Error('recipe not found');
    error.code = 404;
    throw error;
  }  
};

const isValidId = (id) => {
  if (!ObjectId.isValid(id)) return true;
};

const validateRecipeOwner = async (userID, userRole, recipe) => {
  isValidRecipe(recipe);
  if (recipe.userId !== userID && userRole !== 'admin') {
    const error = new Error('unauthorized');
    error.code = 401;
    throw error;
  }
};

module.exports = {
  validateRecipeBody,
  isValidRecipe,
  isValidId,
  validateRecipeOwner,
};