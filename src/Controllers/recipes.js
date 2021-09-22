const Recipes = require('../Services/recipeServices');

const createRecipe = async (req, res, next) => {
  const token = req.headers.authorization;
  const result = await Recipes.create(req.body, token);

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
  const { authorization: auth } = req.headers; 
  const { id } = req.params;
  const result = await Recipes.update(req.body, auth, id);
  if (result.message) return next(result);
  return res.status(200).json(result);
};

const remove = async (req, res, next) => {
  const { authorization: auth } = req.headers; 
  const { id } = req.params;
  const result = await Recipes.remove(auth, id);
  if (result.message) return next(result);
  return res.status(204).end();
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  update,
  remove,
};
