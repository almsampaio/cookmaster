const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class EmailAlreadyRegistered extends AppError {
  constructor(
    message = 'Validation: Email already registered',
    err = { 
      message: errorsMessages.emailAlreadyRegistered,
    },
    statusCode = StatusCodes.CONFLICT,
    name = 'Error',
  ) {
    super();
    this.message = message;
    this.name = name;
    this.err = err;
    this.statusCode = statusCode;
  }
}

module.exports = EmailAlreadyRegistered;