const recipesService = require('../services/recipesService');

const create = async (req, res) => {
  const recipe = req.body;
  const { userId } = req;
  const recipeCreated = await recipesService.create(recipe, userId);
  return res.status(recipeCreated.status).json(recipeCreated.message);
};

const getAll = async (_req, res) => {
  const recipes = await recipesService.getAll();
  return res.status(recipes.status).json(recipes.message);
};

const getById = async (req, res) => {
  const { _id } = req.params;
  const recipe = await recipesService.getById(_id);
  return res.status(recipe.status).json(recipe.message);
};

const update = async (req, res) => {
  const { params: { _id }, body: recipe } = req;
  const updateRecipe = await recipesService.update(recipe, _id);
  return res.status(updateRecipe.status).json(updateRecipe.message);
};

const deleteOne = async (req, res) => {
  const { _id } = req.params;
  const deleteRecipe = await recipesService.deleteOne(_id);
  return res.status(deleteRecipe.status).json(deleteRecipe.message);
};

const uploadPicture = async (req, res) => {
  const { params: { _id }, file } = req;
  const uploadPictureRecipe = await recipesService.uploadPicture(_id, file);
  return res.status(uploadPictureRecipe.status).json(uploadPictureRecipe.message);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteOne,
  uploadPicture,
};
