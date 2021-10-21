const { create, getAll, findRecipe } = require('../services/recipesServices');

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

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
