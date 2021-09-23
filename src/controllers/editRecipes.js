const services = require('../services');

module.exports = async (req, res) => {
  const { status, recipe } = await services.editRecipes(req);
  res.status(status).json(recipe);
};