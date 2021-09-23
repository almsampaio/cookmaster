const Validation = require('./constructor');

async function isEmailValid(email, verifyExistence) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isRegexValid = new Validation(emailRegex.test(email));
  const isEmailTrue = new Validation(!!email);
  const isExistenceFalse = new Validation(!await verifyExistence(email));

  isEmailTrue.verify('badRequest');
  isRegexValid.verify('badRequest');
  isExistenceFalse.verify('conflict');
}

async function isPasswordValid(password) {
  const isPasswordTrue = new Validation(!!password);
  isPasswordTrue.verify('badRequest');
}

module.exports = {
  isEmailValid,
  isPasswordValid,
};
