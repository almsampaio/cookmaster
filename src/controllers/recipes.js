const recipeService = require('../services/recipes');

const addRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.token;
  const userId = _id;
  const newRecipe = { name, ingredients, preparation, userId };

  const newRecipeAdded = await recipeService.addRecipe(newRecipe);

  if (!newRecipeAdded.error) return res.status(201).json({ recipe: newRecipeAdded });
  return res.status(newRecipeAdded.error).json(newRecipeAdded);
};

const allRecipes = async (req, res) => {
  const allRecipesArr = await recipeService.allRecipes();

  return res.status(200).json(allRecipesArr);
};

module.exports = {
  addRecipe,
  allRecipes,
};