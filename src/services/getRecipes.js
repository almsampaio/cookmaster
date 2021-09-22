const models = require('../models');
const httpStatus = require('../utils/httpStatus');

module.exports = async () => {
  const recipes = await models.getRecipes();
  return { 
    status: httpStatus.OK_STATUS,
    recipes,
   };
};