const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const exceptions = {
    recipeNotFound: {
      message: 'recipe not found',
      code: 404,
    },
};

const verifyIfUserHaveAuthorizationToEdit = async (recipeId, userId) => {
  const getRecipe = await recipeModel.getById(recipeId);

  if (!getRecipe) return false;

  const getUser = await userModel.findById(userId);

  if (getRecipe.userId !== userId && getUser.role !== 'admin') {
    return false;
  } 

  return true;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const updateImageUrl = async (id, imgUrl) => {
  const result = recipeModel.updateImgUrl(id, imgUrl);

  return result;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const create = async (recipe) => recipeModel.create(recipe);

// ----------------------------------------------------- || ----------------------------------------------------- //

const getById = async (id) => {
  const result = await recipeModel.getById(id);

  if (!result) return { error: exceptions.recipeNotFound };

  return result;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const getAll = async () => recipeModel.getAll();

// ----------------------------------------------------- || ----------------------------------------------------- //

const update = async (recipeId, recipe, userId) => {
  const authorizedUser = verifyIfUserHaveAuthorizationToEdit(recipeId, userId);

  if (!authorizedUser) return { error: exceptions.recipeNotFound };

  const result = await recipeModel.update(recipeId, recipe);

  return result;
};

// ----------------------------------------------------- || ----------------------------------------------------- //

const exclude = async (recipeId, userId) => {
  const authorizedUser = verifyIfUserHaveAuthorizationToEdit(recipeId, userId);
  
  if (!authorizedUser) return { error: exceptions.recipeNotFound };

  const result = await recipeModel.exlude(recipeId);

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
  verifyIfUserHaveAuthorizationToEdit,
  updateImageUrl };