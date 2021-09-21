function Validation(condition) {
  this.statusCode = {
    badRequest: { status: 400, message: 'Invalid entries. Try again.' },
    notFound: { status: 404, code: 'not_found' },
    conflict: { status: 409, message: 'Email already registered' },
   };
  this.condition = condition;
}

Validation.prototype.newError = function newError(status, message) {
  const error = new Error(message);
  error.status = status;
  throw error;
};

Validation.prototype.validate = function validate(statusName) {
  const { status, message } = this.statusCode[statusName];

  if (!this.condition) this.newError(status, message);
};

module.exports = Validation;