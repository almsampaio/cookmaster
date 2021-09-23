const { ObjectId } = require('bson');
const models = require('../models');
const httpStatus = require('../utils/httpStatus');

module.exports = async (req) => {
  const { body, params: { id } } = req;

  await models.editRecipes(ObjectId(id), body);

  const recipe = await models.getRecipeById(ObjectId(id));

  return {
    status: httpStatus.OK_STATUS,
    recipe,
  };
};