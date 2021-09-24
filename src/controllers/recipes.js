const express = require('express');
const rescue = require('express-rescue');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());
const service = require('../services/recipes');

const createRecipes = rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const createdRecipe = await service.createRecipes(name, ingredients, preparation, _id);
  if (createdRecipe.message) {
    return res.status(409).json(createdRecipe.message);
  }
  return res.status(201).json(createdRecipe);
});

const findRecipes = rescue(async (req, res) => {
  const recipes = await service.findRecipes();
  if (recipes.message) {
    return res.status(404).json(recipes.message);
  }
  return res.status(200).json(recipes);
});
const findRecipesById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await service.findRecipesById(id);
  if (recipe.message) {
    return res.status(404).json(recipe);
  }
  return res.status(200).json(recipe);
});

module.exports = { createRecipes, findRecipes, findRecipesById };