const {
  emailIsValid,
  nameIsValid,
  passwordIsValid } = require('./validations');

function validateUser({ name, email, password }) {
  if (!nameIsValid(name) || !emailIsValid(email) || !passwordIsValid(password)) {
    return { code: 400, message: 'Invalid entries. Try again.' };
  }
  return {};
}

module.exports = {
  validateUser,
};