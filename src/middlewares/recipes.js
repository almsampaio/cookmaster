require('dotenv').config();
const jwt = require('jsonwebtoken');
const schema = require('../schema');
// const { verify } = require('../auth/jwtFunctions');

const checkFieldName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
    .status(schema.status.badRequest)
    .json({ message: schema.messages.invalidEntries });
  }
  next();
};

const checkFieldIngredients = (req, res, next) => {
  const { ingredients } = req.body;
  if (!ingredients) {
    return res
    .status(schema.status.badRequest)
    .json({ message: schema.messages.invalidEntries });
  }
  next();
};

const checkFieldPreparation = (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation) {
    return res
    .status(schema.status.badRequest)
    .json({ message: schema.messages.invalidEntries });
  }
  next();
};

const secret = process.env.SECRET || 'senha_dificil';

const checkToken = (req, res, next) => {
  // gambiarra temporária
  const token = req.headers.authorization;
  jwt.verify(token, secret, (err, _decoded) => {
    if (err) {
      return res
         .status(schema.status.unauthorized)
         .json({ message: schema.messages.jwtMalformed });
    }
  });

  // Queria bastante que funcionasse, perguntar isso no plantão depois
  // const { authorization } = req.headers;
  // const token = verify(authorization);
  // if (!token) {
  //   return res
  //   .status(schema.status.unauthorized)
  //   .json({ message: schema.messages.jwtMalformed });
  // }
  next();
};

module.exports = {
  checkFieldName,
  checkFieldIngredients,
  checkFieldPreparation,
  checkToken,
};
