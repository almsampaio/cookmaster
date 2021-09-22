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

async function getAll(req, res) {
  const recipes = await recipeService.getAll();
  res.status(200).json(recipes);
}

module.exports = {
  addRecipe,
  getAll,
};