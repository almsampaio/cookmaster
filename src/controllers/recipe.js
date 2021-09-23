const { join } = require('path');
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

const getOne = async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.getOne(id);
  return res.status(200).json(result);
};

const editOne = async (req, res) => {
  const userId = req.user;
  const updatedRecipe = req.body;
  const { id } = req.params;
  const result = await recipeService.editOne(userId, id, updatedRecipe);
  return res.status(200).json(result);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  await recipeService.deleteOne(id, userId);
  return res.status(204).json();
};

const uploadImage = async (req, res) => {
  const imageContent = req.file;
  const urlImage = join('localhost:3000', 'src', 'uploads', imageContent.filename);
  const { id } = req.params;
  const result = await recipeService.uploadImage(id, urlImage);
  return res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
  getOne,
  editOne,
  deleteOne,
  uploadImage,
};