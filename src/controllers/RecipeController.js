const RecipeService = require('../services/RecipeService');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipeCreated = await RecipeService.create(
    { name, ingredients, preparation }, _id,
);

  if (recipeCreated.message) {
    return res.status(recipeCreated.code)
      .json({ message: recipeCreated.message }); 
  }

  res.status(201).json(recipeCreated);
};

module.exports = {
  create,
};