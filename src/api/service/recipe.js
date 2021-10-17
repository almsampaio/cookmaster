const AppError = require('../helpers/appError');
const { createRecipe, getAll, getRecipe } = require('../models/recipes');
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

const getRecipeService = async (id) => {
  try {
    const recipe = await getRecipe(id);
    return recipe;
  } catch (error) {
   throw new AppError('recipe not found', 404);
  }
};

module.exports = { createRecipeService, getRecipesService, getRecipeService };