const rescue = require('express-rescue');

const recipeService = require('../services/recipesService');

const createRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const newRecipe = {
    name,
    ingredients,
    preparation,
    userId,
  };

  const recipe = await recipeService.createRecipe(newRecipe);

  res.status(201).json({ recipe });
});

const getRecipes = rescue(async (req, res) => {
  const recipes = await recipeService.getRecipes();

  res.status(200).json(recipes);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipeService.getById(id);

  if (recipe.code) return next(recipe);

  res.status(200).json(recipe);
});

module.exports = {
  createRecipe,
  getRecipes,
  getById,
};