const statusCode = require('http-status-codes');
const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: id } = req.user;
  const recipe = await recipesService.create({ name, ingredients, preparation });
  const { _id } = recipe;

  if (recipe.message === 'Invalid entries. Try again.') {
    return res.status(statusCode.BAD_REQUEST).json(
      { message: recipe.message },
  );
} 
  return res.status(statusCode.CREATED).json({ recipe: 
    { name, ingredients, preparation, userId: id, _id } });
};

const getAll = async (req, res) => {
  const listRecipes = await recipesModel.getAll();
  return res.status(statusCode.OK).json(listRecipes);
};

module.exports = { create, getAll }; 