const jwt = require('jsonwebtoken');
const Recipes = require('../Models/recipesModel');
const User = require('../Models/usersModel');
const { builtError } = require('./usersServices');

const secret = 'Apenas_para_fins_didaticos_:)';

const validateToken = async (token) => {
  try {
    if (!token) return builtError(401, 'missing auth token');
    const { data: { email } } = jwt.verify(token, secret);
    const user = await User.findByEmail(email);
    return user;
  } catch ({ message }) {
    return builtError(401, message);
  }
};

const create = async (payload, token) => {
  const user = await validateToken(token);
  if (user.message) return user;
  const { _id: id } = user;
  if (!user) return builtError(401, 'jwt malformed');
  const recipeId = await Recipes.create({ user, ...payload });
  return { recipe: { _id: recipeId, id, ...payload } };
};

const getAll = async () => Recipes.get('all');

const getById = async (id) => {
  const recipes = await Recipes.get(id);
  if (!recipes) return builtError(404, 'recipe not found');
  return recipes;
};

const update = async (payload, token, recipeId) => {
  const user = await validateToken(token);
  if (user.message) return user;
  const { _id: id, role } = user;
  const { userId } = await getById(recipeId);
  if ((!id || id !== userId) && role === 'user') return builtError(401, 'jwt malformed');

  return Recipes.update(payload, recipeId);
};

const remove = async (token, recipeId) => {
  const user = await validateToken(token);
  if (user.message) return user;
  const { _id: id, role } = user;
  const { userId } = await getById(recipeId);
  if ((!id || id !== userId) && role === 'user') return builtError(401, 'jwt malformed');

  return Recipes.remove(recipeId);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
