const { StatusCodes } = require('http-status-codes');

class AppError extends Error {
  constructor(
    message,
    err = {},
    statusCode = StatusCodes.UNPROCESSABLE_ENTITY,
    name = 'Error',
  ) {
    super();
    this.message = message;
    this.name = name;
    this.err = err;
    this.statusCode = statusCode;
  }

  getError() {
    return this;
  }
}

module.exports = AppError;
