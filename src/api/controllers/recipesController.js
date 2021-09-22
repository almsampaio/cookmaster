const rescue = require('express-rescue');
const { StatusCodes: { CREATED } } = require('http-status-codes');
const service = require('../services/recipesService');

module.exports = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id: userId } = req.user;
  const recipes = await service.createRecipe(userId, name, ingredients, preparation);
  console.log(recipes);
  res.status(CREATED).json(recipes);
});