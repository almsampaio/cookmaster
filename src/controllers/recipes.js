const Recipes = require('../services/recipes');

const create = async (req, res) => {
  const { _id } = req.user;
  const { status, data, err } = await Recipes.create(req.body, _id);
  if (err) return res.status(status).json(err);

  res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await Recipes.getAll();

  res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data, err } = await Recipes.getById(id);
  if (err) return res.status(status).json(err);

  res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { status, data, err } = await Recipes.update(id, req.body, _id);
  if (err) return res.status(status).json(err);

  res.status(status).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { status, err } = await Recipes.remove(id);
  if (err) return res.status(status).json(err);

  res.status(status).send();
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};