const services = require('../services/products');

const controlCreate = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, info, message } = await services.servicesCreate(name, quantity);

  if (message) {
    return res.status(status).json({ err: { code: 'invalid_data', message } });
  }

  res.status(status).json(info);
};

module.exports = {
  controlCreate,
};