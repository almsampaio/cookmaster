const rescue = require('express-rescue');
const RecipeService = require('../services/RecipeService');

const create = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const recipe = await RecipeService.create(
    name,
    ingredients,
    preparation,
    userId,
  );

  return res.status(201).json({ recipe });
});

const getAll = rescue(async (req, res) => {
  const recipes = await RecipeService.getAll();

  return res.status(200).json(recipes);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeService.getById(id);

  return res.status(200).json(recipe);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipeUpdate = await RecipeService.update(
    id,
    name,
    ingredients,
    preparation,
  );

  return res.status(200).json(recipeUpdate);
});

const deleteRecipe = rescue(async (req, res) => {
  const { id } = req.params;
  await RecipeService.deleteRecipe(id);

  return res.status(204).end();
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteRecipe,
};
