const SECRET = 'secret';
const jwt = require('jsonwebtoken');
const recipesServices = require('../services/recipesServices');

const create = async (req, res) => {
  const createRecipe = await recipesServices.create(req.body);
  return res.status(createRecipe.status).json(createRecipe.message);
};

const get = async (_req, res) => {
  const recipes = await recipesServices.get();
  return res.status(recipes.status).json(recipes.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.getById(id);
  return res.status(recipe.status).json(recipe.message);
};

const put = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { _id } = jwt.verify(token, SECRET);
  const recipe = await recipesServices.put(id, req.body, _id);
  return res.status(recipe.status).json(recipe.message);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const deleted = await recipesServices.destroy(id);
  return res.status(deleted.status).json();
};

const upload = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const token = req.headers.authorization;
  const { _id } = jwt.verify(token, SECRET);
  const uploadFile = await recipesServices.upload(id, filename, _id);
  return res.status(uploadFile.status).json(uploadFile.message);
};

module.exports = { create, get, getById, put, destroy, upload };
