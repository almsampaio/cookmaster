const serviceRecipes = require('../services/recipes');

const createRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  // const token = req.headers['authorization'];
  
  const recipe = await serviceRecipes.createRecipes(name, ingredients, preparation, token);
  if (recipe.errorCode) return res.status(recipe.errorCode).json(recipe.errorInfo);
  return res.status(201).json(recipe);
};

module.exports = {
  createRecipes,
};