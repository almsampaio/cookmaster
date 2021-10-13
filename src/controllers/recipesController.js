const recipesService = require('../services/recipesService');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const result = await recipesService.create(name, ingredients, preparation, userId);
  const { message, createdRecipe } = result;

  if (!result) return res.status(400).json({ message });

  return res.status(201).json({ recipe: createdRecipe });
};

const getRecipes = async (req, res) => {
  const recipes = await recipesService.getRecipes();
  return res.status(200).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const { recipeById, message } = await recipesService.getRecipeById(id);
  
  if (!recipeById) return res.status(404).json({ message });

  return res.status(200).json(recipeById);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  // const { _id: userId } = req.user;

  const {
    recipeById,
    message } = await recipesService.updateRecipe(id, name, ingredients, preparation);

  if (!recipeById) return res.status(401).json({ message });

  // console.log(recipeById);

  return res.status(200).json(recipeById);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;

  await recipesService.deleteRecipe(id, userId, role);

  return res.status(204).json();
};

const uploadImage = async (req, res, _next) => {
  const { id } = req.params;
  const { filename } = req.file; // filename é que diz o nome é a extensão do arquivo
  // console.log(req.params);
  const image = `localhost:3000/src/uploads/${filename}`;
  const { result } = await recipesService.uploadImage(id, image);
  // console.log(result);
  return res.status(200).json(result);
};

module.exports = {
  create,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
