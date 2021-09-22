const { StatusCodes: { CREATED } } = require('http-status-codes');
const recipeService = require('../services/recipeService');

const createRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const recipe = await recipeService.createNewRecipe(req.body, userId);
  res.status(CREATED).json({ recipe });
};

module.exports = {
  createRecipe,
};