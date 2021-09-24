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

// REQUISITO 5
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { status, recipe, err } = await services.recipesService.getRecipeById(id);
  if (err) return res.status(status).json({ message: err.message });
  res.status(status).json(recipe);
};

// REQUISITO 7
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;
  const { authorization } = req.headers;

  const { status, updateRecipes, err } = await 
  services.recipesService.updateRecipe(id, recipe, authorization);

  if (err) return res.status(status).json({ message: err.message });
  res.status(status).json(updateRecipes);
};

// REQUISITO 8

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const { status, err } = await services.recipesService.deleteRecipe(id, authorization);
  if (err) return res.status(status).json({ message: err.message });
  res.status(status).json();
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
