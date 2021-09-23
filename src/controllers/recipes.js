const serviceRecipes = require('../services/recipes');

const createRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  // const token = req.headers['authorization'];
  
  const recipe = await serviceRecipes.createRecipes(name, ingredients, preparation, token);
  if (recipe.errorCode) return res.status(recipe.errorCode).json(recipe.errorInfo);
  return res.status(201).json(recipe);
};

const getRecipes = async (req, res) => {
  const recipes = await serviceRecipes.getRecipes();
  return res.status(200).json(recipes);
};

module.exports = {
  createRecipes,
  getRecipes,
};
