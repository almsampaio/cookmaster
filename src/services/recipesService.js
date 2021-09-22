const recipeModel = require('../models/recipesModel');
const httpStatus = require('../util/statusHttp');
const errorMsg = require('../util/errorMsg');

const getAll = async () => {
  const result = await recipeModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await recipeModel.getById(id);
  if (!result) return { status: httpStatus.NOT_FOUND, msg: errorMsg.recipeNotFound };
  return result;
};

const create = async (obj) => {
  const { recipe: { name, ingredients, preparation }, user: { _id } } = obj;
  if (!name || !ingredients || !preparation) {
    return { status: httpStatus.BAD_REQUEST, msg: errorMsg.invalidEntries };
  }
  const recipe = { name, ingredients, preparation, userId: _id };
  const result = await recipeModel.create(recipe);
  return { recipe: result };
};

const update = async (user, recipe, recipeId) => {
  const { _id } = user;
  const { id: recipeID } = recipeId;
  const result = await recipeModel.update(recipeID, { ...recipe, userId: _id });
  return result;
};

const remove = async (id) => {
  const result = await recipeModel.remove(id);
  if (!result) return { status: httpStatus.NOT_FOUND, msg: errorMsg.recipeNotFound };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
