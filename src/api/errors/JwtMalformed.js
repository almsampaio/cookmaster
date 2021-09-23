const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
const { errorsMessages } = require('./errorsMessages');

class JwtMalformed extends AppError {
  constructor(
    message = 'Validation: Jwt malformed',
    err = { 
      message: errorsMessages.jwtMalformed,
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

module.exports = JwtMalformed;
