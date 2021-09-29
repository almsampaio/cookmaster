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

const getRecipes = async (_req, res) => {
  const recipes = await service.getRecipes();

  return res.status(status.OK).json(recipes);
};

const getRecipeByID = async (req, res) => {
  const { params: { id } } = req;
  const recipeByID = await service.getRecipeByID(id);
  if (recipeByID.err) {
    return res.status(status[recipeByID.err.code]).json({ message: recipeByID.err.message });
  }
  return res.status(status.OK).json(recipeByID);
};

const updateRecipeByID = async (req, res) => {
  const { body, headers: { authorization }, params: { id } } = req;
  const updatedUser = await service.updateRecipeByID(body, authorization, id);
  if (updatedUser.err) {
    return res.status(status[updatedUser.err.code]).json({ message: updatedUser.err.message });
  }
  return res.status(status.OK).json(updatedUser);
};

module.exports = {
  createRecipes,
  getRecipes,
  getRecipeByID,
  updateRecipeByID,
};
