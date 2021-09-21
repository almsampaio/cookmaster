const rescue = require('express-rescue');
const UsersServices = require('../services/users');

const create = rescue(async (req, res) => {
  const { name, email, password } = req.body;

  const result = await UsersServices.create(name, email, password);
  if (result.message) return res.status(result.code).json({ message: result.message });
  res.status(201).json(result);
});

module.exports = {
  create,
};
