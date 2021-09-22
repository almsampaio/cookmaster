const userService = require('../services/userService');

const create = async (req, res) => {
  const { status, data: { name, email, role, _id } } = await userService.create(req.body);
  res.status(status).json({ user: { name, email, role, _id } });
};

const login = async (req, res) => {
  const { status, token } = await userService.login(req.body);
  res.status(status).json({ token });
};

module.exports = {
  create,
  login,
};
