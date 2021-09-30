// const jwt = require('jsonwebtoken');
// const userModel = require('../models/userModel');

// const secretPassword = 'secret';

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateIngredients = (req, res, next) => {
  const { ingredients } = req.body;

  if (!ingredients || ingredients === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validatePreparation = (req, res, next) => {
  const { preparation } = req.body;

  if (!preparation || preparation === '') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

// const validateToken = async (req, res, next) => {
//   const userToken = req.headers.authorization; // pego o token em base64
  
//   if (!userToken) {
//     return res.status(401).json({ message: 'missing auth token' });
//   }

//   try {
//     const payload = jwt.verify(userToken, secretPassword); // verifico o token e recebo payload

//     const user = await userModel.searchByEmail(payload.email); // pego o user a partir do email

//     if (!user || user === undefined) {
//       return res.status(401).json({ message: 'jwt malformed' });
//     }

//     req.user = user; // passo o user para ser pego no controller

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: err.message });
//   }
// };

module.exports = {
  validateName,
  validateIngredients,
  validatePreparation,
  // validateToken,
};