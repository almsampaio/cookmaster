const Recipes = require('../Models/recipesModel');
const { builtError } = require('./usersServices');

const create = async (payload, user) => {
  const { _id: userId } = user;
  const recipeId = await Recipes.create({ userId, ...payload });
  return { recipe: { _id: recipeId, userId, ...payload } };
};

const getAll = async () => Recipes.get('all');

const getById = async (id) => {
  const recipes = await Recipes.get(id);
  if (!recipes) return builtError(404, 'recipe not found');
  return recipes;
};

const update = async (payload, user, recipeId) => {
  const { _id: id, role } = user;
  const { userId } = await getById(recipeId);
  if (`${id}` !== `${userId}` && role === 'user') return builtError(401, 'jwt malformed');

  return Recipes.update(payload, recipeId);
};

const remove = async (user, recipeId) => {
  const { _id: id, role } = user;
  const { userId } = await getById(recipeId);
  if (`${id}` !== `${userId}` && role === 'user') return builtError(401, 'jwt malformed');

  return Recipes.remove(recipeId);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
