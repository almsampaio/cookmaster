const status = require('../api/status');
const modelUser = require('../models/recipes');

const servicesCreate = async (infoRecipe, userId) => {
  const newUser = await modelUser.modelCreate(infoRecipe, userId);
  return { status: status.HTTP_CREATED, info: newUser };
};

module.exports = {
  servicesCreate,
};
