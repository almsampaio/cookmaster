const status = require('../api/status');
const modelUser = require('../models/recipes');

const servicesCreate = async (infoRecipe, userId) => {
  const newRecipe = await modelUser.modelCreate(infoRecipe, userId);
  return { status: status.HTTP_CREATED, info: newRecipe };
};

const servicesGetAll = async () => {
  const recipes = await modelUser.modelGetAll();
  return { status: status.HTTP_OK_STATUS, info: recipes };
};

const servicesGetById = async (id) => {
  const model = await modelUser.modelGetById(id);
  if (!model) { return { status: status.HTTP_NOT_FOUND, message: 'recipe not found' }; }
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

const servicesUpdate = async (recipeData, id) => {
  const model = await modelUser.modelUpdate(recipeData, id);
  return { status: status.HTTP_OK_STATUS, info: model }; 
};

const servicesDelete = async (id) => {
  const model = await modelUser.modelDelete(id);
  return { status: status.HTTP_NO_CONTENT, info: model }; 
};

module.exports = {
  servicesCreate,
  servicesGetAll,
  servicesGetById,
  servicesUpdate,
  servicesDelete,
};
