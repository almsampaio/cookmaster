const status = require('../api/status');
const modelUser = require('../models/recipes');

const servicesCreate = async (infoRecipe, userId) => {
  const newRecipe = await modelUser.modelCreate(infoRecipe, userId);
  return { status: status.HTTP_CREATED, info: newRecipe };
};

const servicesGetAll = async () => {
  const recipes = await modelUser.modelGetAll();
  return { status: status.HTTP_CREATED, info: recipes };
};

module.exports = {
  servicesCreate,
  servicesGetAll,
};
