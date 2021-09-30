const model = require('../models/Recipes');
const { OK } = require('./Status');

const allRecipes = async (_req, res) => {
  const recipes = await model.allRecipes();

  res.status(OK).json(recipes);
};

module.exports = {
  allRecipes,
};
