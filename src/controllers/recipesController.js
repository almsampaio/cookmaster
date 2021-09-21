const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const result = await productsService.getAll();
  return res.status(result.status).json(result.response);
};

const getOneProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.findById(id);
  return res.status(result.status).json(result.response);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsService.create(name, quantity);
  return res.status(result.status).json(result.response);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await productsService.update(id, name, quantity);
  return res.status(result.status).json(result.response);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.deleteById(id);
  return res.status(result.status).json(result.response);
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};