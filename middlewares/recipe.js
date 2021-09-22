const {
  StatusCodes: { BAD_REQUEST },
} = require('http-status-codes');
const Schema = require('../validations/schemas');

const recipeValidation = async (req, _res, next) => {
  const { error } = Schema.recipeSchema.validate(req.body);
  if (error) next({ message: 'Invalid entries. Try again.', statusCode: BAD_REQUEST });
  next();
};

module.exports = recipeValidation;