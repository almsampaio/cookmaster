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

  return res.status(201).json(createRecipe);
});

const getAll = rescue(async (_req, res) => {
  const recipesArray = await service.getAll();

  return res.status(200).json(recipesArray);
});

module.exports = {
  create,
  getAll,
};
