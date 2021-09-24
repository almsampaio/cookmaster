const recipeService = require('../services/recipeService');

exports.create = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;

    const recipe = await recipeService.create({ name, ingredients, preparation, userId });

    res.status(201).json({ recipe });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (_req, res, next) => {
  try {
    const recipes = await recipeService.getAll();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await recipeService.getById(id);

    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
};
