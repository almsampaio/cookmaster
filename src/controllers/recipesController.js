const rescue = require('express-rescue');
const recipeService = require('../services/recipesService');

const create = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.payload;
  const userId = _id;
  
 // console.log(userId);
  const recipes = await recipeService.create(name, ingredients, preparation, userId);

  if (recipes.message) return res.status(400).json(recipes);

  return res.status(201).json(recipes);
});

module.exports = {
    create,
};