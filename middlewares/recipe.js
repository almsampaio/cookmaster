const { ObjectId } = require('mongodb');
const {
  StatusCodes: { BAD_REQUEST, NOT_FOUND },
} = require('http-status-codes');
const Schema = require('../validations/schemas');

const recipeValidation = async (req, _res, next) => {
  const { error } = Schema.recipeSchema.validate(req.body);
  if (error) next({ message: 'Invalid entries. Try again.', statusCode: BAD_REQUEST });
  next();
};

const checkIfProductIdExists = async (req, _res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id) || !id) {
    return next({ message: 'recipe not found', statusCode: NOT_FOUND }); 
  }
  next();
};

module.exports = {
  recipeValidation,
  checkIfProductIdExists,
};