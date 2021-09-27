const { insertOneRecipe, findAllRecipes, findRecipeById } = require('./recipesModel');
const { findAUserWithEmail } = require('../users/usersModel');

function validateSingleField(field) {
  if (!field || field === '') return false;
  return true;
}

function validateFields({ name, ingredients, preparation }) {
  if (validateSingleField(name)
    && validateSingleField(ingredients)
    && validateSingleField(preparation)
  ) {
    return true;
  }
  return false;
}

async function postRecipe(recipe, user) {
  const validUser = await findAUserWithEmail(user.email);
  if (!validUser) return ({ statusCode: 400, message: 'jwt malformed' });
  const validFields = validateFields(recipe);
  if (!validFields) return ({ statusCode: 400, message: 'Invalid entries. Try again.' });
  const { _id: userId } = validUser;
  const recipeAndUser = { ...recipe, userId };
  const insertedRecipe = await insertOneRecipe(recipeAndUser);
  return insertedRecipe;
}

async function getAllRecipes() {
  const allRecipes = await findAllRecipes();
  if (!allRecipes) return { statusCode: 404, message: 'recipe not found' };
  return allRecipes;
}

async function getRecipeById(id) {
  const recipe = await findRecipeById(id);
  if (!recipe) return { statusCode: 404, message: 'recipe not found' };
  return recipe;
}

module.exports = {
  postRecipe,
  getAllRecipes,
  getRecipeById,
};
