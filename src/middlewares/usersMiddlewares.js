const {
  // STATUS_OK,
  // STATUS_CREATE,
  STATUS_BAD_REQUEST,
  // STATUS_UNAUTHORIZED,
  // STATUS_NOT_FOUND,
  // STATUS_UNPROCESSABLE,
  STATUS_CONFLICT,
} = require('../utils/httpStatus');

const { findByEmail } = require('../models/usersModel');

const ERROR_INVALID_ENTRIES = { message: 'Invalid entries. Try again.' };
const ERROR_CONFLICT = { message: 'Email already registered' };

const checksEmptyFields = (req, res, next) => { // verifica campos vazios.
  console.log('Checando se há campos vazios no req.body.\n');
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(STATUS_BAD_REQUEST).json(ERROR_INVALID_ENTRIES);
  }
  next();
};

const checksValidEmail = (req, res, next) => { // verifica validade do e-mail via regex.
  const { email } = req.body;
  // se chegou neste middleware, existe algo digitado em email, portanto não verificamos (!email).
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (!emailPattern.test(email)) {
    return res.status(STATUS_BAD_REQUEST).json(ERROR_INVALID_ENTRIES);
  }
  next();
};

const checksUniqueEmail = async (req, res, next) => { // verifica se o e-mail é unico ou já existe o mesmo no banco.
  const { email } = req.body;
  const existingUser = await findByEmail(email);
  if (existingUser) { // se findByEmail retornar um objeto válido, então encontrou um usuário cadastrado com este email, logo retornará conflito.
    return res.status(STATUS_CONFLICT).json(ERROR_CONFLICT);
  }
  next();
};

module.exports = {
  checksEmptyFields,
  checksValidEmail,
  checksUniqueEmail,
};