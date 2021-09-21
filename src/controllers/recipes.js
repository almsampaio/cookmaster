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

module.exports = {
  create,
  getAll,
};