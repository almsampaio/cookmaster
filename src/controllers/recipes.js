const recipeService = require('../services/recipes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await recipeService.createRecipe(name, ingredients, preparation, _id);

  return res.status(201).json({ recipe });
};

module.exports = {
  createRecipe,
};