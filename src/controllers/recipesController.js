const recipeService = require('../services/recipesService');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const recipe = await recipeService.create(name, ingredients, preparation, userId);

  if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });

  res.status(201).json(recipe);
};

const getAll = async (req, res) => {
  const recipes = await recipeService.getAll();

  res.status(200).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeService.getByid(id);

  if (recipe.message) return res.status(recipe.code).json({ message: recipe.message });

  res.status(200).json(recipe);
};

const update = async (req, res) => {
  const { _id: userId, role } = req.user;
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const user = {
    id,
    name,
    ingredients,
    preparation,
  };

  const result = await recipeService.update(userId, role, user);

  res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
