const serviceUsers = require('../services/users');

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const { status, data } = await serviceUsers.create(name, email, password);

  if (data) return res.status(status).json(data);

  res.status(status).json(data);
};

module.exports = {
  create,
};