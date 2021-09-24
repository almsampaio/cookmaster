const recipesModel = require('../models/recipesModel');

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
};

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await recipesModel.create(name, ingredients, preparation, userId);
  return newRecipe;
};

const getById = async (id) => {
  const recipe = await recipesModel.getById(id);
  return recipe;
};

const update = async (id, recipe, userId) => {
  const updatedRecipe = await recipesModel.update(id, recipe, userId);
  return updatedRecipe;
};

const exclude = async (id) => {
  const removeRecipe = await recipesModel.exclude(id);
  return removeRecipe;
};

const addImage = async (image, id) => {
  const addNewImage = await recipesModel.addImage(image, id);
  return addNewImage;
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  exclude,
  addImage,
};