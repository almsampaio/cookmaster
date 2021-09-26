const recipeService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const create = await recipeService.createRecipe(req.body);
  if (create.message) return res.status(create.code).json({ message: create.message });
  console.log(req.user, 'controller');
  res.status(201).json(create);
};

const getRecipes = async (req, res) => {
  const recipes = await recipeService.getRecipes();
  res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { _id } = req.params;
  const findId = await recipeService.getRecipeById(_id);
  if (findId.message) return res.status(findId.code).json({ message: findId.message });
  return res.status(200).json(findId);
};

const editeRecipe = async (req, res) => {
  const { _id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipe = await recipeService.editeRecipe(_id, name, ingredients, preparation);
  const newRecipe = { ...recipe, userId: 'userId' };
  res.status(200).json(newRecipe);
};

const deleteRecipe = async (req, res) => {
  const { _id } = req.params;
  const delette = await recipeService.deleteRecipe(_id);
  res.status(204).json(delette);
};

module.exports = { createRecipe, getRecipes, getRecipeById, editeRecipe, deleteRecipe };
