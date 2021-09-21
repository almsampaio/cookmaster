const Recipes = require('../Services/recipeServices');

const createRecipe = async (req, res, next) => {
  const token = req.headers.authorization;
  const result = await Recipes.create(req.body, token);

  if (result.message) return next(result);
  return res.status(201).json(result);
};

module.exports = {
  createRecipe,
};
