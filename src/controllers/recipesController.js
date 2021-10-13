const recipesService = require('../services/recipesService');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const result = await recipesService.create(name, ingredients, preparation, userId);
  const { message, createdRecipe } = result;

  if (!result) return res.status(400).json({ message });

  return res.status(201).json({ recipe: createdRecipe });
};

const getRecipes = async (req, res) => {
  const recipes = await recipesService.getRecipes();
  return res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { recipeById, message } = await recipesService.getRecipeById(id);
  
  if (!recipeById) return res.status(404).json({ message });

  return res.status(200).json(recipeById);
};

module.exports = {
  create,
  getRecipes,
  getRecipeById,
};
