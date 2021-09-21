const service = require('../services');

const createUser = async (req, res) => {
  const { status, user } = await service.createUser(req.body);
  return res.status(status).json({ user });
};

module.exports = {
  createUser,
};