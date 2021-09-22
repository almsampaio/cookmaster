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

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  const response = await service.getRecipeById(id);

  if (response.error) return next(response);

  res.status(200).json(response);
};

const updatedRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id, role } = req.user;
  const payload = { name, ingredients, preparation, recipeId: id, userId: _id, role };

  const response = await service.updateRecipe(payload);

  if (response.error) return next(response);

  res.status(200).json(response);
};

const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;

  const response = await service.deleteRecipe(id);
  if (response.error) return next(response);

  res.status(204).json();
};

const addImage = async (req, res, next) => {
  const { id } = req.params;
  const { _id, role } = req.user;
  const payload = { recipeId: id, loggedUserId: _id, role };

  const response = await service.addImage(payload);

  if (response.error) return next(response);

  res.status(200).json(response);
};

module.exports = { 
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updatedRecipe,
  deleteRecipe,
  addImage,
};
