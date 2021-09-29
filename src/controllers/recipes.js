const serviceRecipe = require('../services/recipes');

const create = async (req, res) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;
  const result = await serviceRecipe.create({ name, ingredients, preparation }, token);
  return res.status(201).json(result);
};

const find = async (_req, res) => {
  const result = await serviceRecipe.find();
  return res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await serviceRecipe.findById(id);
  return res.status(200).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;
  const result = await serviceRecipe.update({ name, ingredients, preparation }, token, id);
  return res.status(200).json(result);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const result = await serviceRecipe.exclude(token, id);
  return res.status(204).json(result);
};

const addImage = async (req, res) => {
  const filePath = req.file.path;
  const { id } = req.params;
  const token = req.headers.authorization;
  const result = await serviceRecipe.addImage(token, id, filePath);
  return res.status(200).json(result);
};

module.exports = {
  create,
  find,
  findById,
  update,
  exclude,
  addImage,
};