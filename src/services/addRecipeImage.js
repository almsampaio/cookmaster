const { ObjectId } = require('bson');
const models = require('../models');
const httpStatus = require('../utils/httpStatus');
const errorMessages = require('../utils/errorMessages');

module.exports = async (id, user) => {
  const image = `localhost:3000/src/uploads/${id}.jpeg`;

  const recipe = await models.getRecipeById(ObjectId(id));

  if (!recipe) throw errorMessages.RECIPE_NOT_FOUND;

  const { _id: userId, role } = user;

  if (userId !== recipe.userId && role !== 'admin' && !recipe.userId) {
    throw errorMessages.INVALID_ENTRIES;
  }

  await models.addRecipeImage(ObjectId(id), image);

  const updatedRecipe = await models.getRecipeById(ObjectId(id));

  return {
    status: httpStatus.OK_STATUS,
    updatedRecipe,
  };
};