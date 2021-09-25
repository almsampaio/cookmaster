// const { ObjectId } = require('mongodb');
const modelsRecipes = require('../models/recipesModels');
const validRecipes = require('../schemas/validationsRecipes');
const authVerify = require('../auth/authBasic');

const createRecipe = async (name, ingredients, preparation, token) => {
  const tokenVerify = await authVerify.validToken(token);

  // console.log('tokenVerify', tokenVerify);

  const validFields = validRecipes.fieldsRequired(name, ingredients, preparation);
  if (validFields) return { status: 400, data: validFields };

  if (tokenVerify.message) return { status: 401, data: tokenVerify };

  const [newRecipes] = await modelsRecipes
    .createRecipes(name, ingredients, preparation, tokenVerify.id);

  // const { _id, name, ingredients, preparation } = newRecipes;

  // console.log('service', newRecipes);

  return { status: 201, data: { recipe: { ...newRecipes } } };
  
  // return { status: 201,
  // data: { recipe: { _id, name, ingredients, preparation, userId: tokenVerify.id } } };
};

const getAllRecipes = async () => {
  const recipes = await modelsRecipes.getAllRecipes();

  return { status: 200, data: [...recipes] };
};

const getByIdRecipe = async (id) => {
  const recipe = await modelsRecipes.getByIdRecipe(id);

  const recipeExists = validRecipes.idExists(recipe);
  if (recipeExists) return { status: 404, data: recipeExists };

  console.log('service', recipe);
  
  return { status: 200, data: { ...recipe } };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getByIdRecipe,
};