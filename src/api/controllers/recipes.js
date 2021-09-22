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

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipesById,
};