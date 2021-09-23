const services = require('../services');

const createRecipe = async (req, res) => {
  const newRecipe = req.body;
  const { authorization } = req.headers;
  const { status, addRecipes, err } = await 
  services.recipesService.createRecipe(newRecipe, authorization);
  if (err) return res.status(status).json({ message: err.message });
  res.status(status).json({ recipe: addRecipes });
};

module.exports = {
  createRecipe,
};
