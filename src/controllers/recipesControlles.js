const servicesRecipes = require('../services/recipesServices');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;

  // console.log('controller', token);

  const { status, data } = await servicesRecipes
    .createRecipe(name, ingredients, preparation, token);

  return res.status(status).json(data);
};

module.exports = {
  createRecipe,
};