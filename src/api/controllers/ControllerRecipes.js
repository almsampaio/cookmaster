const ServiceRecipes = require('../services/ServiceRecipes');

const create = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;

    const createdRecipe = await ServiceRecipes.create(token, { name, ingredients, preparation });

    return res.status(201).json(createdRecipe);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
