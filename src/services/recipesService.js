const Recipes = require('../models/recipesModel');

const create = async (name, ingredients, preparation, userId) => (
  Recipes.create(name, ingredients, preparation, userId)
  );

const getAll = async () => Recipes.getAll();

module.exports = {
  create,
  getAll,
};
