const { Recipes } = require('../models');

const create = (name, ingredients, preparation, userId) => Recipes
    .create(name, ingredients, preparation, userId)
    .then((result) => result);

const getAll = () => Recipes.getAll().then((res) => res);

module.exports = {
  create,
  getAll,
};