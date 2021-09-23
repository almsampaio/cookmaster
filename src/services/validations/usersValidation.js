const Validation = require('./constructor');

function isNameValid(name) {
  const isNameTrue = new Validation(!!name);
  isNameTrue.validate('badRequest');
}

async function isEmailValid(email, verifyExistence) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isRegexValid = new Validation(emailRegex.test(email));
  const isEmailTrue = new Validation(!!email);
  const isExistenceFalse = new Validation(!await verifyExistence(email));

  isEmailTrue.validate('badRequest');
  isRegexValid.validate('badRequest');
  isExistenceFalse.validate('conflict');
}

async function isPasswordValid(password) {
  const isPasswordTrue = new Validation(!!password);
  isPasswordTrue.validate('badRequest');
}

module.exports = {
  isNameValid,
  isEmailValid,
  isPasswordValid,
};
