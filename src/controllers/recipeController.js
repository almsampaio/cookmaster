const recipeService = require('../services/recipeService');

const create = async (req, res) => {
  const { status, data } = await recipeService.create(req.body);
  res.status(status).json({ recipe: data });
};

const getAll = async (_req, res) => {
  const { status, data } = await recipeService.getAll();
  res.status(status).json(data);
};

module.exports = {
  create,
  getAll,
};
