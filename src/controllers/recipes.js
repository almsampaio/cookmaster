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

const update = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const updateRecipe = await recipesServices.update(id, name, ingredients, preparation);
  return res.status(schema.status.ok).json(updateRecipe);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  await recipesServices.exclude(id);
  return res.status(schema.status.noContent).json();
};

const putWithImage = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const image = `localhost:3000/src/uploads/${filename}`;
  const recipeWithImage = await recipesServices.putWithImage(id, image);
  return res.status(schema.status.ok).json(recipeWithImage);
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  exclude,
  putWithImage,
};
