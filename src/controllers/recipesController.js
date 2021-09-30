const Recipes = require('../services/recipesService');

const CREATED = 201;

const addRecipe = async (req, res) => {
  const recipeInfo = req.body;
  const { _id: userId } = req.user;
  const recipe = { ...recipeInfo, userId };

  const newRecipe = await Recipes.addRecipe(recipe);

  if (newRecipe.err) {
    return res
      .status(newRecipe.err.status)
      .json({ message: newRecipe.err.message });
  }

  return res.status(CREATED).json({ recipe: newRecipe });
};

module.exports = {
  addRecipe,
};
