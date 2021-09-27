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

module.exports = {
  create,
};
