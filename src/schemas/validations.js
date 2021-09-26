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

module.exports = {
  emailIsValid,
  nameIsValid,
  passwordIsValid,
};