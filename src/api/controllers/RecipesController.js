const recipeService = require('../services/RecipesService');

const createRecipe = async (req, res) => {
  const { userId } = req;
  const recipeData = req.body;

  const { status, message, recipe } = await recipeService.createRecipe(recipeData, userId);

  if (message) return res.status(status).json({ message });

  res.status(status).json({ recipe });
};

const getAll = async (req, res) => {
  const result = await recipeService.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.getById(id);
  if (!result) return res.status(404).json({ message: 'recipe not found' });
  return res.status(200).json(result);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.userId;
  const { status, data, err } = await recipeService.updateRecipe(id, req.body, _id);
  if (err) return res.status(status).json(err);

  res.status(status).json(data);
};

const removeRecipe = async (req, res) => {
  const { id } = req.params;
  const { status, err } = await recipeService.removeRecipe(id);
  if (err) return res.status(status).json(err);

  res.status(status).send();
};

const updateImage = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const { status, data, err } = await recipeService.updateImage(id, filename);
  if (err) return res.status(status).json(err);

  res.status(status).json(data);
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  removeRecipe,
  updateImage,
};