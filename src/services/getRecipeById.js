const { ObjectId } = require('bson');
const models = require('../models');
const httpStatus = require('../utils/httpStatus');
const errorMessage = require('../utils/errorMessages');

module.exports = async (id) => {
  if (!ObjectId.isValid(id)) throw errorMessage.RECIPE_NOT_FOUND;

  const recipe = await models.getRecipeById(ObjectId(id));
  
  if (!recipe) throw errorMessage.RECIPE_NOT_FOUND;

  return {
    status: httpStatus.OK_STATUS,
    recipe,
  };
};