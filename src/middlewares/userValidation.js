const usersModel = require('../models/userModel');

const nameValidate = async (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const emailValidate = async (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const parseEmail = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
  const compareEmail = email.match(parseEmail);
  if (!compareEmail) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;

  const searchByEmail = await usersModel.searchByEmail(email);
  console.log(searchByEmail);
  if (searchByEmail) return res.status(409).json({ message: 'Email already registered' });
  next();
};

module.exports = {
  nameValidate,
  emailValidate,
  emailExists,
};