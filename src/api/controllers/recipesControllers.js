const recipesModel = require('../models/recipesModel');
const auth = require('../services/auth');

const createRecipe = async (req, res) => {
    const { authorization } = req.headers;
    const { name, ingredients, preparation } = req.body;
    const userAuthorization = auth.validateToken(authorization);
    const { _id: id } = userAuthorization;
    if (userAuthorization.status) {
       return res.status(userAuthorization.status).json(userAuthorization.obj);
    }
    const recipe = await recipesModel.createRecipe(name, ingredients, preparation, id);
    res.status(201).json({ recipe });
};  

const getAll = async (_req, res) => {
  const recipes = await recipesModel.getAll();
  res.status(200).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.getById(id);
  if (!recipe) return res.status(404).json({ message: 'recipe not found' });
  res.status(200).json(recipe);
};

const updateById = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipe = await recipesModel.updateById(id, name, ingredients, preparation);
  const userAuthorization = auth.validateToken(authorization);
  if (userAuthorization.status) {
    return res.status(userAuthorization.status).json(userAuthorization.obj);
  }
  res.status(200).json(recipe);
};

module.exports = {
    createRecipe,
    getAll,
    getById,
    updateById,
};