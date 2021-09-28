const recipeService = require('../services/recipeService');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;

const RECIPE_NOT_FOUND = 'recipe not found';

const createRecipe = async (req, res) => {
  const { userId } = req;
  const recipeData = req.body;

  const { status, message, recipe } = await recipeService.createRecipe(recipeData, userId);

  if (message) return res.status(status).json({ message });

  res.status(status).json({ recipe });
};

const getAll = async (_req, res) => {
  const result = await recipeService.getAll();
  return res.status(STATUS_OK).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.getById(id);
  if (!result) return res.status(STATUS_NOT_FOUND).json({ message: RECIPE_NOT_FOUND });
  return res.status(STATUS_OK).json(result);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.userId;
  const { status, data, err } = await recipeService.editRecipe(id, req.body, _id);
  if (err) return res.status(status).json(err);
  res.status(status).json(data);
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  editRecipe,
};
