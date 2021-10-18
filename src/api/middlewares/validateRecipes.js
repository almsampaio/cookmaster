const jwt = require('jsonwebtoken');

const {
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
} = require('../../../schemas/status');

const {
  Secret,
} = require('../../../services/users/jwt');

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateIngredients = (req, res, next) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients === '') {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validatePreparation = (req, res, next) => {
  const { preparation } = req.body;

  if (!preparation || preparation === '') {
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;

  try {
    const payload = jwt.verify(token, Secret);

    req.userRecipes = payload;

    next();
  } catch (error) {
    return res.status(HTTP_UNAUTHORIZED).json({
      message: error.message,
    });
}
};

const validateUserOrAdminToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, Secret);
    req.userRecipes = payload;
    next();
  } catch (error) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = {
  validateName,
  validateIngredients,
  validatePreparation,
  validateToken,
  validateUserOrAdminToken,
};