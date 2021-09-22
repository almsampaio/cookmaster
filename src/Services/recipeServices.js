const jwt = require('jsonwebtoken');
const Recipes = require('../Models/recipesModel');
const User = require('../Models/usersModel');
const { builtError } = require('./usersServices');

const secret = 'Apenas_para_fins_didaticos_:)';

const create = async (payload, token) => {
  try {
    const { data: { email } } = jwt.verify(token, secret);
    const { _id: userId } = await User.findByEmail(email);
    if (!userId) return builtError(401, 'jwt malformed');
    const recipeId = await Recipes.create({ userId, ...payload });
    return { recipe: { _id: recipeId, userId, ...payload } }; 
  } catch ({ message }) {
    return builtError(401, message);
  }
};

const getAll = async () => Recipes.get('all');

const getById = async (id) => {
  const recipes = await Recipes.get(id);
  if (!recipes) return builtError(404, 'recipe not found');
  return recipes;
};

module.exports = {
  create,
  getAll,
  getById,
};