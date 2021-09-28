const recipeService = require('../services/recipesService');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const recipe = await recipeService.create(name, ingredients, preparation);

  if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });

  res.status(201).json(recipe);
};

const getAll = async (req, res) => {
  const recipes = await recipeService.getAll();

  res.status(200).json(recipes);
};

module.exports = {
  create,
  getAll,
};
