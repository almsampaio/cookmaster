const { ObjectId } = require('bson');
const models = require('../models');
const httpStatus = require('../utils/httpStatus');

module.exports = async (id) => {
  await models.deleteRecipe(ObjectId(id));
  return { status: httpStatus.NO_CONTENT };
};