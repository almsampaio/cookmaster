const serviceRecipes = require('../services/recipes');

const createRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  
  const recipe = await serviceRecipes.createRecipes(name, ingredients, preparation, token);
  if (recipe.errorCode) return res.status(recipe.errorCode).json(recipe.errorInfo);
  return res.status(201).json(recipe);
};

const getRecipes = async (req, res) => {
  const recipes = await serviceRecipes.getRecipes();
  return res.status(200).json(recipes);
};

const getRecipesById = async (req, res) => {
  const { id } = req.params;
  const recipe = await serviceRecipes.getRecipesById(id);
  if (recipe.errorCode) return res.status(recipe.errorCode).json(recipe.errorInfo);
  return res.status(recipe.code).json(recipe.recipeInfo);
};

module.exports = {
  createRecipes,
  getRecipes,
  getRecipesById,
};
