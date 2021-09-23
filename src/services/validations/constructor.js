function Validation(condition) {
  this.statusCode = {
    badRequest: { status: 400, message: 'Invalid entries. Try again.' },
    unauthorized: { status: 401, message: 'Incorrect username or password' },
    notFound: { status: 404, message: 'Not found' },
    conflict: { status: 409, message: 'Email already registered' },
   };
  this.condition = condition;
}

Validation.prototype.newError = function newError(status, message) {
  const error = new Error(message);
  error.status = status;
  throw error;
};

Validation.prototype.verify = function verify(statusName, customMessage) {
  const { status, message } = this.statusCode[statusName];
  const errorMessage = customMessage || message;

  if (!this.condition) this.newError(status, errorMessage);
};

module.exports = Validation;