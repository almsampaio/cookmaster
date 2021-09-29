const { ObjectId } = require('mongodb');
const recipesServices = require('./recipesServices');

// Validação de campo vazio
const empytField = (field) => { 
  if (!field
      || field === null
      || field === ''
      || typeof field !== 'string') { return true; }
  return false;
};

// Middleware para verificar se os campos estão preenchidos
const emptyFildValidation = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  try {
    if (
         empytField(name)
      || empytField(ingredients)
      || empytField(preparation)
    ) { throw new Error('Invalid entries. Try again.'); }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

// Middleware para criar novas receitas
const createRecipes = async (req, res) => {
    const { userId } = req.userInfo;
    const { name, ingredients, preparation } = req.body;
    const recipeCreated = await recipesServices.create(name, ingredients, preparation, userId);
    return res.status(201).json({ recipe: recipeCreated });
};

// Middleware para acessar todas as receitas
const getAllRecipes = async (_req, res) => {
  const recipes = await recipesServices.getAll();
  return res.status(200).json(recipes);
};

// Middleware para acessar as receitas pelo id
const getRecipeById = async (req, res, _next) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (!ObjectId.isValid(id)) throw new Error('recipe not found');
    const recipe = await recipesServices.getById(id);
    if (!recipe || recipe === null) throw new Error('recipe not found');
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Middleware para atualizar receita
const updateRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const { userInfo } = req;
    const recipeInfo = { id, name, ingredients, preparation };
    const updatedRecipe = await recipesServices.update(recipeInfo, userInfo);
    if (updatedRecipe === null) { throw new Error('Invalid entries. Try again.'); }
    return res.status(200).json(updatedRecipe);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

// Middleware para remover receita
const removeRecipe = async (req, res) => {
  const { id } = req.params;
  const { userInfo } = req;
  await recipesServices.remove(id, userInfo);
  return res.status(204).json();
};

module.exports = {
  emptyFildValidation,
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  removeRecipe,
};