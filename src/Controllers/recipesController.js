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

module.exports = {
  createRecipe,
};