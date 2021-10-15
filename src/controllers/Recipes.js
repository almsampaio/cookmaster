const recipesService = require('../services/Recipes');
const { 
  validateRecipeBody, 
  isValidRecipe, 
  validateRecipeOwner } = require('../middlewares/Recipes');

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

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId, role } = req.user;

  const recipe = await recipesService.getById(id);
  validateRecipeOwner(userId, role, recipe);

  const result = await recipesService.updateRecipe(id, name, ingredients, preparation);
  return res.status(200).json(result);
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
};
