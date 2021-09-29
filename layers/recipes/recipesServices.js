const recipesModels = require('./recipesModels');

const getAll = async () => {
  console.log('passei aqui');
  const recipes = await recipesModels.getAll();
  return recipes;
};

const getById = async (id) => {
  const recipe = await recipesModels.getById(id);
  return recipe;
};

const getByProperty = async (property, value) => {
  const recipe = await recipesModels.getByProperty(property, value);
  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModels.create(name, ingredients, preparation, userId);
  return recipe;
};

const update = async (recipeInfo, userInfo) => {
  const { role, userId } = userInfo;
  if (role === 'user') {
    const recipe = await recipesModels.update(recipeInfo, userId);
    return recipe;
  }
  if (role === 'admin') {
    const recipe = await recipesModels.updateAdmin(recipeInfo);
    return recipe;
  }
};

const remove = async (id, userInfo) => {
  const { role, userId } = userInfo;
  if (role === 'user') {
    const recipe = await recipesModels.remove(id, userId);
    return recipe;
  }
  if (role === 'admin') {
    const recipe = await recipesModels.removeAdmin(id);
    return recipe;
  }
};

const addAndUpdateImage = async (recipeInfo, userInfo) => {
  const { role, userId } = userInfo;
  if (role === 'user') {
    const recipe = await recipesModels.addAndUpdateImage(recipeInfo, userId);
    return recipe;
  }
  if (role === 'admin') {
    const recipe = await recipesModels.addAndUpdateImageAdmin(recipeInfo);
    return recipe;
  }
};

module.exports = { getAll, getById, getByProperty, create, update, remove, addAndUpdateImage };
