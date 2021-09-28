const usersModel = require('../models/users');

const allfields = 'All fields must be filled';

const incorrect = 'Incorrect username or password';

async function verifyEmailPass(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: allfields });
  }
  next();
}

async function emailValid(req, res, next) {
  const { email } = req.body;
  const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
  const math = email.match(pattern);
  if (!math) {
    return res.status(401).json({ message: incorrect });
  }
  next();
}

async function passwordValid(req, res, next) {
  const { password } = req.body;
  const findPassword = await usersModel.findPassword(password);
  if (!findPassword) {
    return res.status(401).json({ message: incorrect });
  }
  next();
}

module.exports = {
  verifyEmailPass,
  emailValid,
  passwordValid,
};
