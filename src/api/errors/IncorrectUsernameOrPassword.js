const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class IncorrectUsernameOrPassword extends AppError {
  constructor(
    message = 'Validation: Incorrect username or password',
    err = { 
      message: errorsMessages.incorrectUsernameOrPassword,
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

module.exports = IncorrectUsernameOrPassword;
