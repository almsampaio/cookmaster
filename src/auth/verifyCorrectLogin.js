const { findEmail } = require('../models/usersModel');
const { incorrectLogin } = require('../utils/messages');

const verifyCorrectLogin = async ({ email, password }) => {
  const existsEmail = await findEmail(email);

  if (!existsEmail || existsEmail.password !== password) throw incorrectLogin;

  return existsEmail;
};

module.exports = verifyCorrectLogin;
