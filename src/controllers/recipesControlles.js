const servicesRecipes = require('../services/recipesServices');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;

  // console.log('controller', token);

  const { status, data } = await servicesRecipes
    .createRecipe(name, ingredients, preparation, token);

  return res.status(status).json(data);
};

const getAllRecipes = async (_req, res) => {
  const { status, data } = await servicesRecipes.getAllRecipes();

  return res.status(status).json(data);
};

const getByIdRecipe = async (req, res) => {
  // const { id } = req.body;
  const { id } = req.params;

  const { status, data } = await servicesRecipes.getByIdRecipe(id);

  return res.status(status).json(data);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  // const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;

  const { status, data } = await servicesRecipes
    .updateRecipe(id, req.body, token);

  return res.status(status).json(data);
};

const excludeRecipe = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const { status, data } = await servicesRecipes.excludeRecipe(id, token);

  return res.status(status).json(data);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getByIdRecipe,
  updateRecipe,
  excludeRecipe,
};