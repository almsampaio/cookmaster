const { ObjectID, ObjectId } = require('mongodb');
const AppError = require('../errors/AppError');

/**
 * @param {ObjectId | String} id 
 * @returns {boolean} true or false
 */
const isValidObjectId = (id) => ObjectID.isValid(id);

const userOrAdminQuery = (role, recipeId, userId) => {
  switch (role) {
    case 'admin':
      return { _id: ObjectId(recipeId) };
    case 'user':
      return { _id: ObjectId(recipeId), userId };
    default:
      throw new AppError('Role is not defined', { message: 'Role is not defined' });
  }
};

module.exports = {
  isValidObjectId,
  userOrAdminQuery,
};
