const RecipesService = require('../services/Recipes');

const createNewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const result = await RecipesService.createNewRecipe(name, ingredients, preparation);
  if (result.error) return res.status(result.status).json({ message: result.message });
  return res.status(201).json({
    recipe: result,
  });
};

const getAllRecipes = async (req, res) => {
  const result = await RecipesService.getAllRecipes();
  if (result.error) return res.status(result.status).json({ message: result.message });
  return res.status(200).json(result);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await RecipesService.getRecipeById({ id });
  if (result.error) return res.status(result.status).json({ message: result.message });
  return res.status(200).json(result);
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
};