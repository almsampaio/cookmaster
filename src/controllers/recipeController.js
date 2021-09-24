const recipeService = require('../services/recipeService');

const create = async (req, res) => {
  const recipe = req.body;
  const { user } = req;

  const { createdRecipe, message, code } = await recipeService.create(recipe);

  if (message) return res.status(code).json({ message });

  return res.status(201).json({recipe: {...createdRecipe, userId: user._id}});
}

module.exports = {
  create,
}
