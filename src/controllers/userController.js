const userService = require('../services/userService');

const create = async (req, res) => {
  const { name, email, password, role } = req.body;

  const result = await userService.create(name, email, password, role);

  if (result.message) return res.status(result.code).json({ message: result.message });

  res.status(201).json(result);
};

module.exports = {
  create,
};