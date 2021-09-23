const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class MissingAuthToken extends AppError {
  constructor(
    message = 'Validation: Missing auth token',
    err = { 
      message: errorsMessages.missingAuthToken,
    },
    statusCode = StatusCodes.UNAUTHORIZED,
    name = 'Error',
  ) {
    super();
    this.message = message;
    this.name = name;
    this.err = err;
    this.statusCode = statusCode;
  }
}

module.exports = MissingAuthToken;
