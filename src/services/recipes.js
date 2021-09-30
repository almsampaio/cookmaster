const { Recipes } = require('../models');

const create = (name, ingredients, preparation, userId) => Recipes
    .create(name, ingredients, preparation, userId)
    .then((result) => result);

module.exports = {
  create,
};