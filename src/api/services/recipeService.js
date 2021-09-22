const recipeModel = require('../models/recipeModel');

const create = async (recipe) => recipeModel.create(recipe);

const getAll = async () => recipeModel.getAll();

module.exports = { create, getAll };