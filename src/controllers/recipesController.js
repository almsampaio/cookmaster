const recipesServices = require('../services/recipesService');

const recipesSubmit = async (req, res, _next) => {
  const recipe = req.body;
  const { _id: userId } = req.user;
  const { status, result } = await recipesServices.register(recipe, userId);
  return res.status(status).json(result);
};

const getRecipes = async (req, res, _next) => {
  const { status, result } = await recipesServices.getRecipesServices();
  return res.status(status).json(result);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const { status, result } = await recipesServices.getByIdRecipeServices(id);
  return res.status(status).json(result);
};

module.exports = {
  recipesSubmit,
  getRecipes,
  getById,
};
