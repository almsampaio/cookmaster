const recipesServices = require('../services/recipesServices');

const create = async (req, res) => {
  const createRecipe = await recipesServices.create(req.body);
  return res.status(createRecipe.status).json(createRecipe.message);
};

module.exports = { create };
