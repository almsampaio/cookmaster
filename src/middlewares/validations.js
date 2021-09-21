const jwt = require('jsonwebtoken');
const Users = require('../models/UsersModel');

const secret = 'meusecret';

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const reg = /\S+@\S+\.\S+/;
  if (!email || !reg.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  next();
};

const validateRecipeInfo = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { email } = (jwt.verify(token, secret));

    const user = await Users.findUserByEmail(email);

    if (!user) return res.status(401).json({ message: 'jwt malformed' });

    req.user = user;

    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateRecipeInfo,
  validateJWT,
};
