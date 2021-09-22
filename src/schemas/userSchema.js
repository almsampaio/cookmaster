function emailIsValid(email) {
  if (!email) return false;

  const emailRegex = /[a-z0-9]+@[a-z0-9]+(\.com)$/gi;
  return emailRegex.test(email);
}

function nameIsValid(name) {
  if (!name) return false;
  return true;
}

function passwordIsValid(password) {
  if (!password) return false;
  return true;
}

function validateUser({ name, email, password }) {
  if (!nameIsValid(name) || !emailIsValid(email) || !passwordIsValid(password)) {
    return { code: 400, message: 'Invalid entries. Try again.' };
  }
  return {};
}

module.exports = {
  validateUser,
};