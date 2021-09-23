const modelRecipes = require('../models/recipes');
const auth = require('../schemas/auth');
const validateRecipe = require('../schemas/recipesValidations');

const createRecipes = async (nome, ingredientes, preparacao, token) => {
  const validToken = await auth.validateToken(token);
  const validRecipeInfo = await validateRecipe.validateRecipeInfos(nome, ingredientes, preparacao);

  if (validToken.errorCode) return validToken;
  if (validRecipeInfo.errorCode) return validRecipeInfo;

  const recipe = await modelRecipes.createRecipe(nome, ingredientes, preparacao, validToken.id);
  const { _id, name, ingredients, preparation } = recipe.ops[0];
  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId: validToken.id,
      _id,
    },
  };
};

const getRecipes = async () => {
  const recipes = await modelRecipes.getRecipes();
  return recipes;
};

module.exports = {
  createRecipes,
  getRecipes,
};