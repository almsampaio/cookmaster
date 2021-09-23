const httpStatus = require('../utils/httpStatus');
const recipesServices = require('../services/recipesServices');

const getAllRecipes = async (_req, res) => {
  const result = await recipesServices.getAllRecipes();
  res.status(httpStatus.ok).json(result);
};

const getRecipeById = async (req, res) => {
  const { errorMessage, recipe } = await recipesServices.getRecipeById(req.params.id);

  if (errorMessage) {
    return res.status(httpStatus.notFound).json(errorMessage);
  }

  res.status(httpStatus.ok).json(recipe);
};

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const { errorMessage, createdRecipe } = await recipesServices.createRecipe(
    { name, ingredients, preparation }, _id,
    );

  if (errorMessage) {
    return res.status(httpStatus.badRequest).json(errorMessage);
  }

  res.status(httpStatus.created).json({ recipe: createdRecipe });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
};
