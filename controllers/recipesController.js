const rescue = require('express-rescue');
const httpStatus = require('../utils/httpStatus');
const recipesServices = require('../services/recipesServices');
const recipesModel = require('../models/recipesModel');

const create = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  console.log(req.user, 'req. user createRecipe controller');
  const { _id: userId } = req.user;
  const recipe = await recipesServices.create(name, ingredients, preparation, userId);

  return res.status(httpStatus.HTTP_CREATE_STATUS).json({ recipe });
});

const getAll = async (_req, res) => {
  const allRecipes = await recipesServices.getAll();
  // console.log(allRecipes, 'recipes controller');
  return res.status(httpStatus.HTTP_OK_STATUS).json(allRecipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.getById(id);
  if (recipe) {
    return res.status(httpStatus.HTTP_OK_STATUS).json(recipe);
  }
  return res.status(httpStatus.HTTP_NOT_FOUND).json({ message: 'recipe not found' });
};

const update = async (req, res) => {
  const { id } = req.params;
  const recipe = req.body;
  const { _id: userId, role } = req.user;

  const oldRecipe = await recipesModel.getById(id);

  if (userId === oldRecipe.userId || role === 'admin') {
    const updatedRecipe = await recipesServices.update(id, recipe, userId);
    return res.status(httpStatus.HTTP_OK_STATUS).json(updatedRecipe);
  }
  return res.status(httpStatus.UNAUTHORIZED).json({ message: 'unauthorized' });
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;
  const oldRecipe = await recipesModel.getById(id);
  if (userId === oldRecipe.userId || role === 'admin') {
    await recipesServices.exclude(id);
    return res.status(httpStatus.NO_CONTENT).send();
  }
  return res.status(httpStatus.UNAUTHORIZED).json({ message: 'unauthorized' });
};

const addImage = async (req, res) => {
  const { id } = req.params;
  const { _id: userId, role } = req.user;
  const { path } = req.file;
  const oldRecipe = await recipesModel.getById(id);
  if (userId === oldRecipe.userId || role === 'admin') {
    const updatedRecipe = await recipesServices.addImage(path, id);
    return res.status(httpStatus.HTTP_OK_STATUS).json(updatedRecipe);
  }
  return res.status(httpStatus.UNAUTHORIZED).json({ message: 'unauthorized' });
};

const getImage = async (req, res) => {
  const { path } = req.file;
  return res.status(httpStatus.HTTP_OK_STATUS).render('file', { path });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
  addImage,
  getImage,
};
