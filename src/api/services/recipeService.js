const recipeModel = require('../models/recipeModel');

const create = async (recipe) => recipeModel.create(recipe);

module.exports = { create };