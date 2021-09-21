const service = require('../services');

module.exports = async (req, res) => {
  const { status, user } = await service.createUser(req.body);
  return res.status(status).json({ user });
};
