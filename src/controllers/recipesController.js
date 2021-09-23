const recipesService = require('../services/recipesService');
const errorDefault = require('../utils/errorDefault');

async function register(req, res, next) {
  try {
    const recipe = req.body;
    const token = req.headers.authorization;

    const ids = await recipesService.register(recipe, token);

    res.status(201).json({ 
      recipe: {
        ...recipe,
        ...ids,
      },
     });
  } catch (err) {
    const error = errorDefault(err);
    next(error);
  }
}

async function getAll(_req, res, next) {
  try {
    const recipes = await recipesService.getAll();

    res.status(200).json(recipes);
  } catch (err) {
    const error = errorDefault(err);
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getById(id);

    res.status(200).json(recipe);
  } catch (err) {
    const error = errorDefault(err);
    next(error);
  }
}

module.exports = {
  register,
  getAll,
  getById,
};
