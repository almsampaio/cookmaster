const serviceRecipes = require('../services/recipes');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const { status, data } = await serviceRecipes.create(name, ingredients, preparation, token);
  return res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await serviceRecipes.getAll();
  return res.status(status).json(data);
};

module.exports = {
  create,
  getAll,
};
