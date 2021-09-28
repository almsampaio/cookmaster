const recipeService = require('../services/recipeService');

const create = async (req, res) => {
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const { err, newRecipe, status } = await recipeService
    .create(name, ingredients, preparation, userId);
  if (err) {
  return res.status(err.code)
    .json({ message: err.message }); 
  }
  res.status(status).json({ recipe: newRecipe });
};

const getAll = async (_req, res) => {
  const { status, recipesList } = await recipeService.getAll();
  res.status(status).json(recipesList);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { err, status, recipeById } = await recipeService.getById(id);
  if (err) {
    return res.status(err.code)
      .json({ message: err.message }); 
    }
  res.status(status).json(recipeById);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const { status, updatedRecipe } = await recipeService
    .update({ id, name, ingredients, preparation, userId });
  res.status(status).json(updatedRecipe);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const { status } = await recipeService.remove(id, userId);
  res.status(status).end();
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
