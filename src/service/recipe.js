const Joi = require('joi');
const recipeModel = require('../model/recipe');
const userModel = require('../model/user');
const errorObjects = require('../../utils/errorsObject');

const valideteRecipe = (name, ingredients, preparation) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate({ name, ingredients, preparation });
  if (error) throw errorObjects.invalidEntries;
};

const create = async (name, ingredients, preparation, userId) => {
  valideteRecipe(name, ingredients, preparation);
  const result = await recipeModel.create(name, ingredients, preparation, userId);
  return result;
};

const getAll = async () => {
  const result = await recipeModel.getAll();
  if (!result) throw errorObjects.notFound;
  return result;
};

const getOne = async (recipeId) => {
  const result = await recipeModel.getOne(recipeId);
  if (!result) throw errorObjects.notFound;
  return result;
};

const checkUserAuth = async (userId) => {
  const user = await userModel.findOneUser(userId);
  return user;
};

const editOne = async (userId, recipeId, updatedRecipe) => {
  const user = await checkUserAuth(userId);
  const recipe = await getOne(recipeId);
  if (recipe.userId !== userId && user.role !== 'admin') throw errorObjects.editionUnauthorized;
  const result = await recipeModel.editOne(recipeId, updatedRecipe);
  if (!result) throw errorObjects.notFound;
  return result.value;
};

const deleteOne = async (recipeId, userId) => {
  const user = await checkUserAuth(userId);
  const recipe = await getOne(recipeId);
  if (recipe.userId !== userId && user.role !== 'admin') throw errorObjects.editionUnauthorized;
  const result = await recipeModel.deleteOne(recipeId);
  if (!result) throw errorObjects.notFound;
};

const uploadImage = async (recipeId, fileName) => {
  const result = await recipeModel.uploadImage(recipeId, fileName);
  return result;
};

module.exports = {
  create,
  getAll,
  getOne,
  editOne,
  checkUserAuth,
  deleteOne,
  uploadImage,
};