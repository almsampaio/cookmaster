const recipeService = require('../service/recipe');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const result = await recipeService.create(name, ingredients, preparation, req.user);
  return res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await recipeService.getAll();
  return res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
};