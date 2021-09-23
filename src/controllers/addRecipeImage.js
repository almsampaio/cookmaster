const services = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const { status, updatedRecipe } = await services.addRecipeImage(id, user);
  res.status(status).json(updatedRecipe);
};