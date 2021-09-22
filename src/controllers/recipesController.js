const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const insertRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id: userId } = req.payload;
  const recipe = await recipeService.createRecipe(name, ingredients, preparation, userId);
  if (recipe.err) {
    return res.status(recipe.err.status).json({ message: recipe.err.message });
  }
  res.status(201).json({ recipe });
});

module.exports = {
  insertRecipe,
};