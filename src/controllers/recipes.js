const service = require('../services/recipes');

const createRecipe = async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const response = await service.createRecipe({ name, ingredients, preparation, userId: _id });
  res.status(201).json(response);
};

const getAllRecipes = async (_req, res, _next) => {
  const response = await service.getAllRecipes();
  res.status(200).json(response);
};

module.exports = { 
  createRecipe,
  getAllRecipes,
};
