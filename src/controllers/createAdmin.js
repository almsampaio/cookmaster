const services = require('../services');

module.exports = async (req, res) => {
  const { status, user } = await services.createAdmin(req);

  res.status(status).json({ user });
};