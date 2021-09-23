const rescue = require('express-rescue');

const recipesSercice = require('../services/recipesService');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const getAll = rescue(async (_req, res) => {
  const recipes = await recipesSercice.getAll();
  res.status(HTTP_OK_STATUS).json(recipes);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const { recipe, message, code } = await recipesSercice.getById(id);

  console.log(recipe, message);

  if (message) return res.status(code).json({ message });

  res.status(HTTP_OK_STATUS).json(recipe);
}); 

const create = rescue(async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;

  const { recipe, message, code } = await recipesSercice
  .create(name, ingredients, preparation, _id);
  
  if (message) return res.status(code).json({ message });

  res.status(HTTP_CREATED_STATUS).json({ recipe });
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const updateRecipe = await recipesSercice.update(id, name, ingredients, preparation);

  res.status(HTTP_OK_STATUS).json(updateRecipe);
});

const exclude = rescue(async (req, res) => {
  const { id } = req.params;
  await recipesSercice.exclude(id);

  return res.status(204).json({});
});

module.exports = { create, getAll, getById, update, exclude };
