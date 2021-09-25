const RecipesService = require('../services/RecipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const recipe = await RecipesService.createRecipe({
    name,
    ingredients,
    preparation,
  });

  res.status(201).json({ recipe });
};

module.exports = { createRecipe };
