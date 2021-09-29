const recipesServices = require('../../services/recipesServices');

const getAllRecipes = async (_req, res) => {
  const recipes = await recipesServices.getAll();
  return res.status(200).json(recipes);
};

module.exports = { getAllRecipes };
