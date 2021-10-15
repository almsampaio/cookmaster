const recipesService = require('../services/Recipes');
const { validateRecipeBody, isValidRecipe } = require('../middlewares/Recipes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  validateRecipeBody(name, ingredients, preparation);
  const result = await recipesService.createRecipe(name, ingredients, preparation, userId);

  return res.status(201).json({
    recipe: result,
  });
};

const getAll = async (_req, res) => {
  const result = await recipesService.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.getById(id);
  isValidRecipe(result);
  return res.status(200).json(result);
};

module.exports = {
  createRecipe,
  getAll,
  getById,
};
