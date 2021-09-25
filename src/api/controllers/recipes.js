const recipesServices = require('../services/recipes');

const createRecipes = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  const CreateRecipes = await recipesServices
    .createRecipes({ name, ingredients, preparation }, token);
  
  if (CreateRecipes.error) return next(CreateRecipes);

  res.status(201).json(CreateRecipes);
};

const getAllRecipes = async (req, res, next) => {
  const GetAllRecipes = await recipesServices.getAllRecipes();
  
  if (GetAllRecipes.error) return next(GetAllRecipes);

  res.status(200).json(GetAllRecipes);
};

const getRecipesById = async (req, res, next) => {
  const { id } = req.params;
  const GetRecipesById = await recipesServices.getRecipesById(id);
  
  if (GetRecipesById.error) return next(GetRecipesById);

  res.status(200).json(GetRecipesById);
};

const uptadeRecipesById = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const token = req.headers.authorization;
  const UptadeRecipesById = await recipesServices
  .uptadeRecipesById({ name, ingredients, preparation }, id, token);
  
  if (UptadeRecipesById.error) return next(UptadeRecipesById);

  res.status(200).json(UptadeRecipesById);
};

const deleteRecipes = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const DeleteRecipes = await recipesServices
  .deleteRecipes(id, token);
  
  if (DeleteRecipes.error) return next(DeleteRecipes);

  res.status(204).json(DeleteRecipes);
};

const uptadeRecipesWithImage = async (req, res, _next) => {
  const { id } = req.params;
  const { path } = req.file;
  
  const recipeUdated = await recipesServices.uptadeRecipesWithImage(id, path);

  res.status(200).json(recipeUdated);
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipesById,
  uptadeRecipesById,
  deleteRecipes,
  uptadeRecipesWithImage,
};