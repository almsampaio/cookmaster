const Recipes = require('../services/Recipes');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const { status, data } = await Recipes.create(name, ingredients, preparation, _id);

  res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await Recipes.getAll();

  res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, message, data } = await Recipes.getById(id);

  if (message) {
    return res.status(status).json({ message });
  }

  res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateRecipe = req.body;
  const { status, data } = await Recipes.update(id, updateRecipe);

  res.status(status).json(data);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};