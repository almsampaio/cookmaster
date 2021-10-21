const { create, getAll, findRecipe, update, deleted } = require('../services/recipesServices');

const createRecipe = async (request, response, next) => {
  const { user } = request;
  const { name, ingredients, preparation } = request.body;

  try {
    const validyRecipe = await create(name, ingredients, preparation, user);

    return response.status(validyRecipe.status).json(validyRecipe.message);
  } catch (err) {
    return next(err);
  }
};

const getAllRecipes = async (_request, response, next) => {
  try {
    const getRecipes = await getAll();
    return response.status(getRecipes.status).json(getRecipes.message);
  } catch (err) {
    return next(err);
  }
};

const getRecipeById = async (request, response, next) => {
  const { id } = request.params;

  try {
    const getRecipe = await findRecipe(id);
    return response.status(getRecipe.status).json(getRecipe.message);
  } catch (err) {
    return next(err);
  }
};

const editRecipe = async (request, response, next) => {
  const { user } = request;
  const { id } = request.params;
  const { name, ingredients, preparation } = request.body;
  const newValues = { name, ingredients, preparation };

  try {
    const setRecipe = await update(id, newValues, user);
    return response.status(setRecipe.status).json(setRecipe.message);
  } catch (err) {
    return next(err);
  }
};

const deleteRecipe = async (request, response, next) => {
  const { id } = request.params;

  try {
    const delRecipe = await deleted(id);
    return response.status(delRecipe.status).json(delRecipe.message);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
};
