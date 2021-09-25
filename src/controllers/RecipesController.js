const RecipesService = require('../services/RecipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const recipe = await RecipesService.createRecipe({
    name,
    ingredients,
    preparation,
  });

  res.status(201).json({ recipe });
};

const getAllRecipes = async (_req, res) => {
  const recipes = await RecipesService.getAllRecipes();

  res.status(200).json(recipes);
};

module.exports = { createRecipe, getAllRecipes };
