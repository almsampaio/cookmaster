const recipeService = require('../services/recipes');

const addRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.token;
  const authorId = _id;
  const newRecipe = { name, ingredients, preparation, authorId };

  const newRecipeAdded = await recipeService.addRecipe(newRecipe);

  if (!newRecipeAdded.error) return res.status(201).json({ recipe: newRecipeAdded });
  return res.status(newRecipeAdded.error).json(newRecipeAdded);
};

module.exports = {
  addRecipe,
};