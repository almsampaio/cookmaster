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

  return { status: 201, data: { recipe: { ...newRecipes } } };
};

const getAllRecipes = async () => {
  const recipes = await modelsRecipes.getAllRecipes();

  return { status: 200, data: [...recipes] };
};

const getByIdRecipe = async (id) => {
  const recipe = await modelsRecipes.getByIdRecipe(id);

  const recipeExists = validRecipes.idExists(recipe);
  if (recipeExists) return { status: 404, data: recipeExists };

  // console.log('service', recipe);
  
  return { status: 200, data: { ...recipe } };
};

const updateRecipe = async (id, dataBody, token) => {
  const exitsToken = await validRecipes.missingAuthToken(token);
  if (exitsToken) return { status: 401, data: exitsToken };

  const tokenVerify = await authVerify.validToken(token);
  if (tokenVerify.message) return { status: 401, data: tokenVerify };

  const result = await modelsRecipes
    .updateRecipe(id, dataBody, tokenVerify.id);

  return { status: 200, data: { ...result } };
};

const excludeRecipe = async (id, token) => {
  const exitsToken = await validRecipes.missingAuthToken(token);
  if (exitsToken) return { status: 401, data: exitsToken };

  await modelsRecipes.excludeRecipe(id);

  return { status: 204 };
};

const updateFile = async (id, dataBody, filename, token) => { // filename = id + extensão(jpeg)
  const tokenVerify = await authVerify.validToken(token);

  const authToken = await validRecipes.missingAuthToken(token);
  if (authToken) return { status: 401, data: authToken };

  const image = `localhost:3000/src/uploads/${filename}`;

  const result = await modelsRecipes
    .updateFile(id, dataBody, tokenVerify.id, image);

  return { status: 200, data: { ...result } };
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getByIdRecipe,
  updateRecipe,
  excludeRecipe,
  updateFile,
};