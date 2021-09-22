const httpStatus = require('../util/statusHttp');
const recipeService = require('../services/recipesService');

const getAll = async (_req, res) => {
  const result = await recipeService.getAll();
  res.status(httpStatus.OK).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.getById(id);
  if (result.msg) return res.status(result.status).json(result.msg);
  res.status(httpStatus.OK).json(result);
};

const create = async (req, res) => {
  const all = { user: req.user, recipe: req.body };
  const result = await recipeService.create(all);
  if (result.msg) return res.status(result.status).json(result.msg);
  res.status(httpStatus.CREATED).json(result);
};

const update = async (req, res) => {
  const result = await recipeService.update(req.user, req.body, req.params);
  res.status(httpStatus.OK).json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.remove(id);
  if (result) return res.status(result.status).json(result.msg);
  res.status(httpStatus.NO_CONTENT).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
