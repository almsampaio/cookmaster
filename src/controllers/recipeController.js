const recipeService = require('../services/recipeService');

const create = async (req, res) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const { err, newRecipe, status } = await recipeService
    .create(name, ingredients, preparation, userId);
  if (err) {
  return res.status(err.code)
    .json({ message: err.message }); 
  }
  res.status(status).json({ recipe: newRecipe });
};

const getAll = async (_req, res) => {
  const { status, recipesList } = await recipeService.getAll();
  return res.status(status).json(recipesList);
};

module.exports = {
  create,
  getAll,
};
