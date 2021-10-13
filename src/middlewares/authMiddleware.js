const jwt = require('jsonwebtoken');
// const recipesService = require('../services/recipesService');

const SECRET = 'mySecret';

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateIngredients = (req, res, next) => {
  const { ingredients } = req.body;
  
  if (!ingredients || ingredients === '') {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validatePreparation = (req, res, next) => {
  const { preparation } = req.body;
  
  if (!preparation || preparation === '') {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization;
  
    const payload = jwt.verify(token, SECRET);

    // console.log(payload);

    // const user = await usersModel.getByEmail(payload.email);

    req.user = payload; // forma de passar informação de um middleware para o outro; próximo middleware é o recipesController;

    // console.log(user);

    next();
  } catch (_e) {
    res.status(401).json({ message: 'jwt malformed' });
  } 
};

const validateUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    // next();
    // console.log(payload);
  } catch (_e) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  next();
};

module.exports = {
  authMiddleware,
  validateName,
  validateIngredients,
  validatePreparation,
  validateUser,
};
