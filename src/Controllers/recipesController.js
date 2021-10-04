const recipeService = require('../Services/recipesServices');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  const { _id: userId } = req.user;
  const { status, message, recipe } = await recipeService
    .createRecipe(userId, name, ingredients, preparation, authorization);
  if (message) return res.status(status).json({ message });
  return res.status(status).json({ recipe });
};

const getAllRecipe = async (req, res) => {
  const { status, recipes } = await recipeService.getAllRecipe();
  return res.status(status).json(recipes);
};

const getRecipeById = async (req, res) => {
  const recipe = await recipeService.getRecipeById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  res.status(200).json(recipe);
};
module.exports = {
  createRecipe,
  getAllRecipe,
  getRecipeById,
};