const recipeService = require('../services/recipesService');

const getAll = async (_req, res) => {
  const recipes = await recipeService.getAll();
  return res.status(200).json(recipes);
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
  const { user } = req;
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const recipeToUpdate = { id, name, ingredients, preparation };
  const result = await recipeService.update(recipeToUpdate, user);
  return res.status(result.status).json(result.response);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const result = await recipeService.deleteById(id, user);
  return res.status(result.status).json(result.response);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteRecipe,
};