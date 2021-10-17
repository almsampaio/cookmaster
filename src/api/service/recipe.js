const AppError = require('../helpers/appError');
const { createRecipe, getAll } = require('../models/recipes');
const recipeSchema = require('../validators/recipeSchemaJOI');

const createRecipeService = async (user, data) => {
  const validate = recipeSchema.validate(data);
  if (validate.error) throw new AppError('Invalid entries. Try again.');
  const recipe = await createRecipe({ userId: user.id, ...data });
  return recipe;
};

const getRecipesService = async () => {
  const recipes = await getAll();
  return recipes;
};

module.exports = { createRecipeService, getRecipesService };