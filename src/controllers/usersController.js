const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  const result = await salesService.getAll();
  return res.status(result.status).json(result.response);
};

const getOneSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.findById(id);
  return res.status(result.status).json(result.response);
};

const createSale = async (req, res) => {
  const itensSold = req.body;
  const result = await salesService.create(itensSold);
  return res.status(result.status).json(result.response);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const result = await salesService.update(id, itensSold);
  return res.status(result.status).json(result.response);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.deleteById(id);
  return res.status(result.status).json(result.response);
};

module.exports = {
  getAllSales,
  getOneSale,
  createSale,
  updateSale,
  deleteSale,
};