const rescue = require('express-rescue');
const { StatusCodes: { CREATED, OK, NOT_FOUND } } = require('http-status-codes');
const service = require('../services/recipesService');

const createRecipes = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id: userId } = req.user;
  const recipes = await service.createRecipe(userId, name, ingredients, preparation);

  res.status(CREATED).json(recipes);
});

const getAllRecipes = rescue(async (_req, res) => {
  const recipes = await service.getAllRecipes();
  res.status(OK).json(recipes);
});

const getRecipesById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipes = await service.getRecipesById(id);
  if (recipes === null) {
    return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
  res.status(OK).json(recipes);
});

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipesById,
};
