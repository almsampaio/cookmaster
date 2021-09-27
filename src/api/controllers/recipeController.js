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

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { user } = req;

    const recipe = await recipeService.update({ id, name, ingredients, preparation, user });
  
    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    await recipeService.delete({ user, id });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
