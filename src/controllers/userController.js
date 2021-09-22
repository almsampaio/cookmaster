const userService = require('../services/userService');

const create = async (req, res) => {
  const { status, data: { name, email, role, _id } } = await userService.create(req.body);
  console.log('controller:', { user: { name, email, role, _id } });
  res.status(status).json({ user: { name, email, role, _id } });
};

module.exports = {
  create,
};
