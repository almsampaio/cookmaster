const recipesService = require('../services/recipes');

const createRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const { id: userId } = req.auth;

  const { error, result } = await recipesService.createRecipe(
    name,
    ingredients,
    preparation,
    userId,
  );

  if (error) return next(error);

  return res.status(201).json(result);
};

const getRecipes = async (req, res, next) => {
  try {
    const result = await recipesService.getRecipes();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { result, error } = await recipesService.getRecipeById(id);

    if (error) next(error);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const editRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeData = req.body;
    const userInfo = req.auth;

    const { result, error } = await recipesService.editRecipeById(id, recipeData, userInfo);

    if (error) next(error);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { result, error } = await recipesService.deleteRecipeById(id);

    if (error) next(error);

    return res.status(204).json(result);
  } catch (error) {
    next(error);
  }
};

const insertImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = req.auth;
    const { filename } = req.file;

    const { result, error } = await recipesService.insertImage(id, filename, userData);

    if (error) next(error);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  insertImage,
};
