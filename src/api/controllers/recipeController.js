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
