const generateJWT = require('./generateJWT');
const { findUserByEmail } = require('./loginModel');

function validateLogin(email, password) {
  if (!email || !password) return false;
  return true;
}

async function loginAttempt(email, password) {
  const incorrectMessage = 'Incorrect username or password';
  const tryUser = await findUserByEmail(email);
  if (!tryUser) return { statusCode: 401, message: incorrectMessage };
  if (tryUser.password !== password) return { statusCode: 401, message: incorrectMessage };
  return tryUser;
}

async function loginService(email, password) {
  const validLogin = validateLogin(email, password);
  if (!validLogin) return ({ statusCode: 401, message: 'All fields must be filled' });

  const canLogin = await loginAttempt(email, password);
  if (canLogin.statusCode) return canLogin;
  const token = generateJWT(canLogin);
  return token;
}

module.exports = {
  loginService,
};
