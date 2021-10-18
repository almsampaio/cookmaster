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

const getById = async (req, res) => {
  const { id } = req.params;  
  const { status, data } = await serviceRecipes.getById(id);
  return res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { status, data } = await serviceRecipes.update(id, req.body, token);
  return res.status(status).json(data);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
