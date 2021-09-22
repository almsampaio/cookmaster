const rescue = require('express-rescue');
const { StatusCodes: { CREATED, OK, NOT_FOUND, NO_CONTENT } } = require('http-status-codes');
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

const updateRecipesById = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipes = await service.updateRecipesById(id, name, ingredients, preparation);
  if (recipes === null) {
    return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
  res.status(OK).json(recipes);
});

const deleteRecipesById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipes = await service.deleteRecipesById(id);

  res.status(NO_CONTENT).json(recipes);
});

const insertImage = rescue(async (req, res) => {
  const { id } = req.params;
  console.log(req.file);
  const { path } = req.file;
  const recipe = await service.getRecipesById(id);
  res.status(200).json({ ...recipe, image: `localhost:3000/${path}` });
  // este trecho do código fiz baseado no PR da Marília
});

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
  insertImage,
};
