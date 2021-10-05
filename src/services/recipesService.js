const recipesModel = require('../models/recipesModel');

const create = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;
  const newRecipe = await recipesModel.create(name, ingredients, preparation, userId);
  return { status: 201, message: { recipe: newRecipe } };
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return { status: 200, message: recipes };
};

const getById = async (_id) => {
  const recipe = await recipesModel.getById(_id);
  return { status: 200, message: recipe };
};

const update = async (recipe, _id) => {
  const { name, ingredients, preparation } = recipe;
  const recipeUpdated = await recipesModel.update(name, ingredients, preparation, _id);
  return { status: 200, message: recipeUpdated };
};

const deleteOne = async (_id) => {
  await recipesModel.deleteOne(_id);
  return { status: 204, message: '' };
};

const uploadPicture = async (_id, file) => {
  const recipeUploaded = await recipesModel.uploadPicture(_id, file);
  return { status: 200, message: recipeUploaded };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteOne,
  uploadPicture,
};
