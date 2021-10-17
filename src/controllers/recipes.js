const RecipesServices = require('../services/recipes');
const RecipesModels = require('../models/recipes');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const result = await RecipesServices.create(name, ingredients, preparation, req.user);
  if (result.message) return res.status(result.code).json({ message: result.message });
  res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await RecipesModels.getAll();
  res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
};
