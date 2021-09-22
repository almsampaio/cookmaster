const recipesService = require('../services/recipes');

const createRecipe = async (req, res, next) => {
  const { name, ingredients, preparation, userId } = req.body;

  const { error, result } = await recipesService.createRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  if (error) return next(error);

  return res.status(201).json(result);
};

module.exports = {
  createRecipe,
};
