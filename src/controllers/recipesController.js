const recipesService = require('../services/recipesService');

const addRecipe = async (req, res) => {
  const { authorization } = req.headers;
  const { status, result } = await recipesService.addRecipe(authorization, req.body);
  res.status(status).json(result);
};

module.exports = { addRecipe };