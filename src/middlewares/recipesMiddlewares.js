const jwt = require('jsonwebtoken');

const {
  // STATUS_OK,
  // STATUS_CREATE,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_NOT_FOUND,
  // STATUS_UNPROCESSABLE,
  // STATUS_CONFLICT,
} = require('../utils/httpStatus');

const SECRET = 'secret-validation-string';
const { findRecipeByIdM } = require('../models/recipesModel');

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(STATUS_UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch (_e) {
    res.status(STATUS_UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

const verifyFields = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(STATUS_BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const checksPermissions = (req, res, next) => {
  const { role, userId } = req.user;
  const { id } = req.params;
  const recipe = findRecipeByIdM(id);
  if (!recipe) {
    return res.status(STATUS_NOT_FOUND).json({ message: 'Recipe not found' });
  }
  if (userId !== recipe.userId && role !== 'admin') {
    console.log('usuario nao eh dono desta receite');
    return res.status(STATUS_UNAUTHORIZED).json({ message: 'Permission denied.' });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyFields,
  checksPermissions,
};