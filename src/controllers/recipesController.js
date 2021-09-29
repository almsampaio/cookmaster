const recipesService = require('../services/recipesService');

const addRecipes = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const { status, response } = await recipesService.addRecipes(
    name, ingredients, preparation, token,
  );
  return res.status(status).json(response);
};

const getRecipes = async (_req, res) => {
  const { status, response } = await recipesService.getRecipes();
  return res.status(status).json(response);
};

module.exports = {
  addRecipes,
  getRecipes,
};
