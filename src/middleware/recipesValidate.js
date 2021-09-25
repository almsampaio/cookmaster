const { recipeValidate } = require('../schema/validationSchema');
const STATUS = require('../util/myConstants');
const recipesServices = require('../services/recipesServices');

const existsRecipesFields = (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { error } = recipeValidate.validate({ name, ingredients, preparation });
  if(error) {
    return next({
      err: { message: 'Invalid entries. Try again.' },
      statusCode: STATUS.STATUS_400_BAD_REQUEST,
    });
  }

  next();
};

const validateRecipeId = async (req, _res, next) => {
  const { id } = req.params;
  const recipes = await recipesServices.getAllRecipes();
  const idAlias = '_id';
  const recipe = recipes.filter((ele) => ele[idAlias].toString() === id);
  if (recipe.length === 0) {
    return next({
      err: { message: 'recipe not found' },
      statusCode: STATUS.STATUS_404_NOT_FOUND,
    });
  }
  next();
};

module.exports = {
  existsRecipesFields,
  validateRecipeId,
};
