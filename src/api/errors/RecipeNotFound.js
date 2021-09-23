const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class RecipeNotFound extends AppError {
  constructor(
    message = 'Validation: Recipe not found',
    err = { 
      message: errorsMessages.recipeNotFound,
    },
    statusCode = StatusCodes.NOT_FOUND,
    name = 'Error',
  ) {
    super();
    this.message = message;
    this.name = name;
    this.err = err;
    this.statusCode = statusCode;
  }
}

module.exports = RecipeNotFound;
