const recipeService = require('../services/recipeService');

const create = async (req, res) => {
  const { status, data } = await recipeService.create(req.body);
  res.status(status).json({ recipe: data });
};

module.exports = {
  create,
};
