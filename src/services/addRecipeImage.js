const { ObjectId } = require('bson');
const models = require('../models');
const httpStatus = require('../utils/httpStatus');
const errorMessages = require('../utils/errorMessages');

module.exports = async (id) => {
  const image = `localhost:3000/src/uploads/${id}.jpeg`;
  await models.addRecipeImage(ObjectId(id), image);
  const recipe = await models.getRecipeById(ObjectId(id));

  if (!recipe) throw errorMessages.RECIPE_NOT_FOUND;

  return {
    status: httpStatus.OK_STATUS,
    recipe,
  };
};