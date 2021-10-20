const RecipeModel = require('../models/Recipes');
const RecipeService = require('../services/Recipes');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const { status, json } = await RecipeService
    .create({ name, ingredients, preparation, userId: _id });

  return res.status(status).json(json);
};

const getAll = async (req, res) => {
  const recipes = await RecipeModel.getAll();
  return res.status(200).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const recipe = await RecipeModel.getById(id);

  if (!recipe) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }

  return res.status(200).json(recipe);
};

const update = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const { id } = req.params;

  const { status, json } = await RecipeService
    .update({ id, name, ingredients, preparation, userId });

  return res.status(status).json(json);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const deletedRecipe = await RecipeModel.deleteById(id);

  if (!deletedRecipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(204).json();
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const image = `localhost:3000/src/uploads/${id}.jpeg`;
  const recipe = await RecipeModel.update({ id, image });

  if (!recipe) {
    return res.status(500).json({ message: 'couldnt update the recipe' });
  }

  return res.status(200).json(recipe);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
  addImage,
};
