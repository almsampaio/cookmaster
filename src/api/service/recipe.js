const AppError = require('../helpers/appError');
const { 
  createRecipe, 
  getAll, getRecipe, 
  updateRecipe, 
  deleteRecipe,
 } = require('../models/recipes');
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

async function updateRecipeService(id, data) {
  const recipe = await getRecipe(id);
  if (!recipe) throw new AppError('Recipe not found', 404);

  await updateRecipe(id, data);
  return { _id: id, ...data };
}

async function deleteRecipeService(id) {
  try {
    await deleteRecipe(id);
  } catch (error) {
    throw new AppError('recipe not found', 404);
  }
}

const addImageRecipe = async (recipeId, imageUrl) => {
  try {
    const recipe = await getRecipe(recipeId);
    const newData = recipe;
    newData.image = imageUrl;
    await updateRecipe(recipeId, newData);
    return newData;
  } catch (error) {
    throw new AppError('recipe not found', 404);
  }
};

module.exports = { 
  createRecipeService, 
  getRecipesService, 
  getRecipeService, 
  updateRecipeService, 
  deleteRecipeService,
  addImageRecipe,
};
