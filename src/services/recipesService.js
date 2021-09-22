const Recipes = require('../models/recipesModel');

const create = async (name, ingredients, preparation, userId) => (
  Recipes.create(name, ingredients, preparation, userId)
  );

module.exports = {
  create,
};
