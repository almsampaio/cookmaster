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

const recipeId = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeService.recipeId(id);

  if (recipe.error) return res.status(recipe.error).json({ message: recipe.message });

  return res.status(200).json(recipe);
};

const updateRecipeId = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;

  const recipeToUpdate = { id, name, ingredients, preparation };

  const recipe = await recipeService.updateRecipeId(recipeToUpdate);

  if (recipe.error) return res.status(recipe.error).json({ message: recipe.message });

  return res.status(200).json(recipe);
};

const deleteRecipeId = async (req, res) => {
  const { id } = req.params;

  const deleteRec = await recipeService.deleteRecipeId(id);

  if (deleteRec.error) return res.status(deleteRec.error).json({ message: deleteRec.message });
  return res.status(204).json();
};

const addImageRecipe = async (req, res) => {
  const { id } = req.params;

  const deleteRec = await recipeService.deleteRecipeId(id);

  if (deleteRec.error) return res.status(deleteRec.error).json({ message: deleteRec.message });
  return res.status(204).json();
};

module.exports = {
  addRecipe,
  allRecipes,
  recipeId,
  updateRecipeId,
  deleteRecipeId,
  addImageRecipe,
};