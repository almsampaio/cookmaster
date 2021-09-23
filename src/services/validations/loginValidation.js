const Validation = require('./constructor');

const emptyField = 'All fields must be filled';
const status = 'unauthorized';

function isLoginEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isRegexValid = new Validation(emailRegex.test(email));
  const isEmailTrue = new Validation(!!email);

  isEmailTrue.verify(status, emptyField);
  isRegexValid.verify(status);
}

function isLoginPasswordValid(password, user) {
  const isPasswordTrue = new Validation(!!password);
  isPasswordTrue.verify(status, emptyField);

  const isUserTrue = new Validation(!!user);
  isUserTrue.verify(status);
  
  const isPasswordMatch = new Validation(password === user.password);

  isPasswordMatch.verify(status);
}

module.exports = {
  isLoginEmailValid,
  isLoginPasswordValid,
};
