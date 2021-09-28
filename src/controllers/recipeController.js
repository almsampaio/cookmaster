const recipeService = require('../services/recipeService');

const create = async (req, res) => {
  const { status, data } = await recipeService.create(req.body);
  res.status(status).json({ recipe: data });
};

const getAll = async (_req, res) => {
  const { status, data } = await recipeService.getAll();
  res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data, error } = await recipeService.getById(id);
  if (error) return res.status(status).json(error);
  res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { status, data } = await recipeService.update(id, req.body, _id);
  res.status(status).json(data);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const { status } = await recipeService.exclude(id);
  res.status(status).end();
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const { _id } = req.user;
  const { status, data } = await recipeService.addImage(id, filename, _id);
  res.status(status).json(data);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
  addImage,
};
