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

module.exports = { recipeRegistration, listAllReceipes };