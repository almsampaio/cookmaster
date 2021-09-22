const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = 'Xablau';

const validateRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const authValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { email } = jwt.verify(token, SECRET);
    const user = await userModel.findUserEmail(email);
    req.user = user;
    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateRecipe,
  authValidation,
};
