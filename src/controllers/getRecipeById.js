const services = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;

  const { status, recipe } = await services.getRecipeById(id); 

  res.status(status).json(recipe);
};