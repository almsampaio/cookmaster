const recipeService = require('../services/recipeService');

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

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await recipeService.getById(id);

  const { error } = result;

  if (error) return res.status(error.code).json({ message: error.message });

  return res.status(200).json(result);
};

const getAll = async (_req, res) => {
  const result = await recipeService.getAll();

  return res.status(200).json(result);
};

module.exports = { create, getAll, getById };