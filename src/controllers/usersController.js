const usersService = require('../services/usersService');

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await usersService.findById(id);
  return res.status(result.status).json(result.response);
};

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await usersService.create(name, email, password);
  return res.status(result.status).json(result.response);
};

module.exports = {
  findById,
  create,
};