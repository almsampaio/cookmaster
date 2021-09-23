const services = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { status } = await services.deleteRecipe(id);
  res.status(status).send(); 
};