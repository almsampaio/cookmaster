const { StatusCodes } = require('http-status-codes');

class AppError extends Error {
  constructor(
    message,
    err = {},
    codeStatus = StatusCodes.UNPROCESSABLE_ENTITY,
    name = 'Error',
  ) {
    super();
    this.message = message;
    this.name = name;
    this.err = err;
    this.codeStatus = codeStatus;
  }

  getError() {
    return this;
  }
}

module.exports = AppError;