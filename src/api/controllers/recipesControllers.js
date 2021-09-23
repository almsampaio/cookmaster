const services = require('../services');

// REQUISITO 3
const createRecipe = async (req, res) => {
  const newRecipe = req.body;
  const { authorization } = req.headers;
  const { status, addRecipes, err } = await 
  services.recipesService.createRecipe(newRecipe, authorization);
  if (err) return res.status(status).json({ message: err.message });
  res.status(status).json({ recipe: addRecipes });
};

// REQUISITO 4
const getAllRecipes = async (_req, res) => {
  const { status, recipes } = await services.recipesService.getAllRecipes();
  res.status(status).json(recipes);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
