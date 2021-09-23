const service = require('../services/recipeService');

const newRecipe = async (req, res) => {
  const recipe = await service.newRecipe(req.body);

  if (recipe.status) {
    return res.status(recipe.status).json({ message: recipe.message });
  }
  return res.status(201).json({ recipe });
};

const getRecipes = async (_req, res) => {
  const recipe = await service.getRecipes();

  return res.status(200).json(recipe);
};

const getRecipe = async (req, res) => {
  const recipe = await service.getRecipe(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
};

const editRecipe = async (req, res) => {
  const { params: { id }, body } = req;

  const recipe = await service.editRecipe(id, body);

  return res.status(200).json(recipe);
};

module.exports = {
  newRecipe,
  getRecipes,
  getRecipe,
  editRecipe,
};
