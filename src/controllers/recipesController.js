const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const insertRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id: userId } = req.payload;
  const recipe = await recipeService.createRecipe(name, ingredients, preparation, userId);
  if (recipe.err) {
    return res.status(recipe.err.status).json({ message: recipe.err.message });
  }
  res.status(201).json({ recipe });
});

const getAllRecipes = rescue(async (req, res) => {
  const recipes = await recipeService.getAllRecipes();
  res.status(200).json(recipes);
});

const getRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.getRecipeById(id);
  if (recipe.err) {
    return res.status(recipe.err.status).json({ message: recipe.err.message });
  }
  return res.status(200).json(recipe);
});

const updateRecipeById = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipe = await recipeService.updateRecipeById(id, name, ingredients, preparation);
  if (recipe.err) {
    return res.status(recipe.err.status).json({ message: recipe.err.message });
  }
  return res.status(200).json(recipe);
});

module.exports = {
  insertRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
};