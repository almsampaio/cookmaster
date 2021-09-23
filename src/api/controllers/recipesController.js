const rescue = require('express-rescue');

const recipesSercice = require('../services/recipesService');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const getAll = rescue(async (_req, res) => {
  const recipes = await recipesSercice.getAll();
  res.status(HTTP_OK_STATUS).json(recipes);
});

const create = rescue(async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;

  const { recipe, message, code } = await recipesSercice
  .create(name, ingredients, preparation, _id);
  
  if (message) res.status(code).json({ message });

  res.status(HTTP_CREATED_STATUS).json({ recipe });
});

module.exports = { create, getAll };
