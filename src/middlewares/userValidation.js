const usersModel = require('../models/users');

const invalidEntries = 'Invalid entries. Try again.';
const emailRegistered = 'Email already registered';

async function verifyName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: invalidEntries });
  }
  next();
}
async function verifyEmail(req, res, next) {
  const { email } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: invalidEntries });
  }
  const pattern = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
  const match = email.match(pattern);
  if (!match) {
    return res.status(400).json({ message: invalidEntries });
  }
  next();
}

async function emailExists(req, res, next) {
  const { email } = req.body;
  const findEmail = await usersModel.findEmail(email);
  if (findEmail) {
    return res.status(409).json({ message: emailRegistered });
  }
  next();
}

module.exports = {
  verifyName,
  verifyEmail,
  emailExists,
};
