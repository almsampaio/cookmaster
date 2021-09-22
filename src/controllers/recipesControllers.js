const recipesService = require('../services/recipesService');

const create = async (req, res) => {
  const recipe = req.body;
  const { userId } = req;
  const recipeCreated = await recipesService.create(recipe, userId);
  return res.status(recipeCreated.status).json(recipeCreated.message);
};

module.exports = {
  create,
};
