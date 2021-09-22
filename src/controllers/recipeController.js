const recipeService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const create = await recipeService.createRecipe(req.body);
  if (create.message) return res.status(create.code).json({ message: create.message });
  // console.log(req.user, 'controller');
  res.status(201).json(create);
};

module.exports = { createRecipe };
