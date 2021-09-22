const recipeService = require('../services/recipesService');

const getAll = async (_req, res) => {
  const result = await recipeService.getAll();
  return res.status(result.status).json(result.response);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.findById(id);
  return res.status(result.status).json(result.response);
};

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const { user } = req;
  const recipe = await recipeService.create(name, ingredients, preparation, user.userId);
  return res.status(201).json({ recipe });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await recipeService.update(id, name, quantity);
  return res.status(result.status).json(result.response);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.deleteById(id);
  return res.status(result.status).json(result.response);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteRecipe,
};