const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class InvalidEntriesTryAgain extends AppError {
  constructor(
    message = 'Validation: Invalid entries. Try again.',
    err = { 
      message: errorsMessages.invalidEntriesTryAgain,
    },
    statusCode = StatusCodes.BAD_REQUEST,
    name = 'Error',
  ) {
    super();
    this.message = message;
    this.name = name;
    this.err = err;
    this.statusCode = statusCode;
  }
}

module.exports = InvalidEntriesTryAgain;
