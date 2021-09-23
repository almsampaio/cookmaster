const recipeService = require('../services/recipeService');

const uploadImg = async (req, res) => {
  const { image } = req;
  const { id } = req.params;
  const result = await recipeService.updateImageUrl(id, image);
  
  return res.status(200).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const create = async (req, res) => {
  const { userId } = req;
  const recipe = req.body;

  const recipeWithUserId = {
    userId,
    ...recipe,
  };

  const result = await recipeService.create(recipeWithUserId);

  return res.status(201).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await recipeService.getById(id);

  const { error } = result;

  if (error) return res.status(error.code).json({ message: error.message });

  return res.status(200).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getAll = async (_req, res) => {
  const result = await recipeService.getAll();

  return res.status(200).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const update = async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;
  const { userId } = req;

  const result = await recipeService.update(id, recipe, userId);

  const { error } = result;

  if (error) return res.status(error.code).json({ message: error.message });

  return res.status(200).json(result);
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const exclude = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const result = await recipeService.exclude(id, userId);

  const { error } = result;

  if (error) return res.status(error.code).json({ message: error.message });

  return res.status(204).end();
};

module.exports = { create, getAll, getById, update, exclude, uploadImg };