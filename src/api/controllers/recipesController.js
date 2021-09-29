const service = require('../services/recipesService');

const status = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  SERVER_ERROR: 500,
};

const createRecipes = async (req, res) => {
  const { body, headers: { authorization } } = req;
  const newUser = await service.createRecipes(body, authorization);
  if (newUser.err) {
    return res.status(status[newUser.err.code]).json({ message: newUser.err.message });
  }
  return res.status(status.CREATED).json(newUser);
};

const showRecipes = async (_req, res) => {
  const recipes = await service.getRecipes();

  return res.status(status.OK).json(recipes);
};

module.exports = {
  createRecipes,
  showRecipes,
};
