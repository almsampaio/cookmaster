const Recipes = require('../Services/recipeServices');

const createRecipe = async (req, res, next) => {
  const { user } = req;
  const result = await Recipes.create(req.body, user);

  if (result.message) return next(result);
  return res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await Recipes.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Recipes.getById(id);
  if (result.message) return next(result);
  return res.status(200).json(result);
};

const update = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const result = await Recipes.update(req.body, user, id);
  if (result.message) return next(result);
  return res.status(200).json(result.value);
};

const remove = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const result = await Recipes.remove(user, id);
  if (result.message) return next(result);
  return res.status(204).end();
};

const addImage = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const result = await Recipes.addImage(user, id);
  if (result.message) return next(result);
  return res.status(200).json(result.value);
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  update,
  remove,
  addImage,
};
