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

module.exports = {
  create,
  getAll,
};
