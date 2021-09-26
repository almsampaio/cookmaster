const errors = require('../errors');
const RecipesService = require('../services/RecipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await RecipesService.createRecipe({
    name,
    ingredients,
    preparation,
    userId: _id,
  });

  res.status(201).json({ recipe });
};

const getAllRecipes = async (_req, res) => {
  const recipes = await RecipesService.getAllRecipes();

  res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipesService.getRecipeById(id);

  if (!recipe) {
    return res.status(404).json({ message: errors.recipeNotFound });
  }

  res.status(200).json(recipe);
};

module.exports = { createRecipe, getAllRecipes, getRecipeById };
