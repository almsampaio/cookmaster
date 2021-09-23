const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class AllFieldsMustBeFilled extends AppError {
  constructor(
    message = 'Validation: All fields must be filled',
    err = { 
      message: errorsMessages.allFieldsMustBeFilled,
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

module.exports = AllFieldsMustBeFilled;
