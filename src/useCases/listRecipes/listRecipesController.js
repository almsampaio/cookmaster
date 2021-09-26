const listRecipesService = require('./listRecipesService');

const { ok } = require('../../utils/httpStatus');

exports.getAll = async (_request, response) => {
  const recipes = await listRecipesService.getAll();

  response.status(ok).json(recipes);
};

exports.getById = async (request, response) => {
  const { recipe } = request;

  response.status(ok).json(recipe);
};
