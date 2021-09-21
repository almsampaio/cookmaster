const httpStatus = require('../util/statusHttp');
const recipeService = require('../services/recipesService');

const getAll = async (_req, res) => {
  const result = await recipeService.getAll();
  res.status(httpStatus.OK).json(result);
};

const create = async (req, res) => {
  const result = await recipeService.create(req);
  res.status(httpStatus.CREATED).json(result);
};

module.exports = {
  getAll,
  create,
};
