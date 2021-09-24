const rescue = require('express-rescue');

const { StatusCodes: { OK } } = require('http-status-codes');

const {
  recipesModel,
} = require('../../models');

module.exports = rescue(async (_req, res) => {
  const recipes = await recipesModel.getAllRecipes();

  res.status(OK).json(recipes);
});
