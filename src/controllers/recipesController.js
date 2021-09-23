const service = require('../services/recipeService');

const newRecipe = async (req, res) => {
  const recipe = await service.newRecipe(req.body);

  console.log('recipe');
  console.log(recipe);

  if (recipe.status) {
    return res.status(recipe.status).json({ message: recipe.message });
  }
  return res.status(201).json({ recipe });
};

module.exports = {
  newRecipe,
};
