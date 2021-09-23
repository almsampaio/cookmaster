const { cat } = require('shelljs');
const RecipesService = require('../Service/RecipesService');

const recipeRegistration = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers.authorization;
    const response = await RecipesService.recipeRegistration(data, token);
    res.status(201).json(response);
  } catch (err) {
    console.log(err.message);
  }
};

const listAllReceipes = async (_req, res) => {
  const response = await RecipesService.listAllReceipes();
  res.status(200).json(response);
};

const listRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await RecipesService.listRecipeById(id);
    return res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { recipeRegistration, listAllReceipes, listRecipeById };