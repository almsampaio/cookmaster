const services = require('../services');

module.exports = async (req, res) => {
  const { status, recipe } = await services.recipesRegister(req);
  res.status(status).json(recipe);
};