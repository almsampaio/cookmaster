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

const updateRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;

  const { updatedRecipe } = await recipesServices.updateRecipe(id, name, ingredients, preparation);

  res.status(httpStatus.ok).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
  await recipesServices.deleteRecipe(req.params.id);

  return res.status(httpStatus.noContent).json({});
};

const uploadImage = async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const image = `localhost:3000/src/uploads/${filename}`;

  const { result } = await recipesServices.uploadImage(id, image);

  return res.status(httpStatus.ok).json(result);
};

const getImage = async (req, res) => {
  res.status(httpStatus.ok).render('file', { path: req.file.path });
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  uploadImage,
  getImage,
};
