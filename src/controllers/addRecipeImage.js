const services = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { status, recipe } = await services.addRecipeImage(id);
  res.status(status).json(recipe);
};