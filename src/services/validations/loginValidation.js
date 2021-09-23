const Validation = require('./constructor');

const emptyField = 'All fields must be filled';
const status = 'unauthorized';

function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isRegexValid = new Validation(emailRegex.test(email));
  const isEmailTrue = new Validation(!!email);

  isEmailTrue.validate(status, emptyField);
  isRegexValid.validate(status);
}

function isPasswordValid(password, user) {
  const isPasswordTrue = new Validation(!!password);
  isPasswordTrue.validate(status, emptyField);

  const isUserTrue = new Validation(!!user);
  isUserTrue.validate(status);
  
  const isPasswordMatch = new Validation(password === user.password);
  isPasswordMatch.validate(status);
}

module.exports = {
  isEmailValid,
  isPasswordValid,
};
