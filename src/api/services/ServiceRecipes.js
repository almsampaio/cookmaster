const ModelUsers = require('../models/ModelUsers');
const ModelRecipes = require('../models/ModelRecipes');
const invalidData = require('../utils/invalidData');
const { verifyToken } = require('../middlewares');

const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const create = async (token, { name, ingredients, preparation }) => {
  const validVerifyToken = await verifyToken(token);

  if (validVerifyToken.message) throw invalidData(validVerifyToken.message, UNAUTHORIZED);

  const { _id: userId } = validVerifyToken;
  
  const createdRecipe = await ModelRecipes.create({ name, ingredients, preparation, userId });

  return createdRecipe;
};

const getAll = async () => {
  const getAllRecipes = await ModelRecipes.getAll();

  return getAllRecipes;
};

const getById = async (id) => {
  const findRecipe = await ModelRecipes.getById(id);

  if (!findRecipe) throw invalidData('recipe not found', NOT_FOUND);

  return findRecipe;
};

const editRecipe = async (id, token, { name, ingredients, preparation }) => {
  if (!token) throw invalidData('missing auth token', UNAUTHORIZED);

  const validVerifyToken = await verifyToken(token);

  if (validVerifyToken.message) throw invalidData(validVerifyToken.message, UNAUTHORIZED);

  const { _id: userId } = validVerifyToken;

  const findRecipe = await ModelRecipes.getById(id);
  const user = await ModelUsers.getById(userId);

 if (user.role !== 'admin' && findRecipe.userId !== userId) {
   throw invalidData('missing auth token', UNAUTHORIZED);
 }

  const editedRecipe = await ModelRecipes
    .editRecipe(id, userId, { name, ingredients, preparation });

  return editedRecipe;
};

const deleteRecipe = async (id, role, userId) => {
  const findRecipe = await ModelRecipes.getById(id);
  // const user = await ModelUsers.getById(userId);

 if (role !== 'admin' && findRecipe.userId !== userId) {
   throw invalidData('missing auth token', UNAUTHORIZED);
 }

 const deletedRecipe = await ModelRecipes.deleteRecipe(id);

 return deletedRecipe;
};

module.exports = {
  create,
  getAll,
  getById,
  editRecipe,
  deleteRecipe,
};
