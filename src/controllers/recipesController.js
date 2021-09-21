const recipeService = require('../services/recipesService');

const getAllProducts = async (_req, res) => {
  const result = await recipeService.getAll();
  return res.status(result.status).json(result.response);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.findById(id);
  return res.status(result.status).json(result.response);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await recipeService.create(name, quantity);
  return res.status(result.status).json(result.response);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await recipeService.update(id, name, quantity);
  return res.status(result.status).json(result.response);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.deleteById(id);
  return res.status(result.status).json(result.response);
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};