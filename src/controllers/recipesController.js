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
  const userId = req.onerUserId;
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const recipeToUpdate = { _id: id, name, ingredients, preparation, userId };
  const result = await recipeService.update(recipeToUpdate);
  return res.status(result.status).json(result.response);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.deleteById(id);
  return res.status(result.status).json(result.response);
};

const validateUser = async (req, res, next) => {
  const { id } = req.params;
  const { role, userId } = req.user;
  const { isValid, response, status, onerUserId } = await recipeService
    .validateUser(id, userId, role);
  if (!isValid) {
    return res.status(status).json(response);
  }
  req.onerUserId = onerUserId;
  next();
};

const registerImage = async (req, res) => {
  const { filename } = req.file;
  const { id } = req.params;
  const { status, response } = await recipeService.registerImage(id, filename);
  res.status(status).json(response);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteRecipe,
  validateUser,
  registerImage,
};