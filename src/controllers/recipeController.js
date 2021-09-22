const recipeService = require('../services/recipeService');

async function addRecipe(req, res) {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const { code, message, recipe } = await recipeService.addRecipe({
    name,
    ingredients,
    preparation,
    userId,
  });
  
  if (message) return res.status(code).json({ message });
  res.status(code).json({ recipe });
}

async function getAll(_req, res) {
  const recipes = await recipeService.getAll();
  res.status(200).json(recipes);
}

async function getById(req, res) {
  const { id } = req.params;
  const { code, message, recipeById } = await recipeService.getById(id);

  if (message) return res.status(code).json({ message });

  res.status(code).json(recipeById);
}

async function updateRecipe(req, res) {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const updatedRecipe = await recipeService.updateRecipe({ id, name, ingredients, preparation });
  res.status(200).json({ ...updatedRecipe, userId });
}

module.exports = {
  addRecipe,
  getAll,
  getById,
  updateRecipe,
};