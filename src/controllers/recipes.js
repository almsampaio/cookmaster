const { recipesServices } = require('../services');
const schema = require('../schema');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const registerRecipe = await recipesServices.create(token, name, ingredients, preparation);
  return res.status(schema.status.created).json(registerRecipe);
};

const getAll = async (_req, res) => {
  const recipes = await recipesServices.getAll();
  return res.status(schema.status.ok).json(recipes);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.getOne(id);
  return res.status(schema.status.ok).json(recipe);
};

module.exports = { create, getAll, getOne };
