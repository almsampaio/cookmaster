const rescue = require('express-rescue');

const service = require('../services/recipesService');

const ERROR_MESSAGE = 'Invalid entries. Try again.';

const create = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id } = req.user;

  const userId = _id;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: ERROR_MESSAGE });
   }

   const createRecipe = await service.create(name, ingredients, preparation, userId);

  res.status(201).json(createRecipe);
});

const getAll = rescue(async (_req, res) => {
  const recipesArray = await service.getAll();

  res.status(200).json(recipesArray);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const recipe = await service.findById(id);

  if (recipe.err) return res.status(404).json({ message: recipe.err.message });

  res.status(200).json(recipe);
});

module.exports = {
  create,
  getAll,
  findById,
};
