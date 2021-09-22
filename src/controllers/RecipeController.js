const RecipeService = require('../services/RecipeService');

const getById = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipeService.getById(id);

  console.log(recipe);

  if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });

  res.status(200).json(recipe);
};

const getAll = async (_req, res) => {
  const recipes = await RecipeService.getAll();

  res.status(200).json(recipes);
};

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
  getAll,
  getById,
};