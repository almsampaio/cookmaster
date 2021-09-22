const services = require('../services');

module.exports = async (_req, res) => {
  const { status, recipes } = await services.getRecipes();
  res.status(status).json(recipes);
};