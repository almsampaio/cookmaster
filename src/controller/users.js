const services = require('../services/users');

const controlCreate = async (req, res) => {
  const infoUser = req.body;
  const { status, info, message } = await services.servicesCreate(infoUser);

  if (message) { return res.status(status).json(message); }

  res.status(status).json({ user: info });
};

module.exports = {
  controlCreate,
};