const jwt = require('jsonwebtoken');
const { validateUser, validateLogin } = require('./auth/validateUser');
const { HTTP_BAD_REQUEST, HTTP_CONFLICT, HTTP_UNAUTHORIZED } = require('../utils/utils');
const model = require('../models/UsersModel');

const JWT_SECRET = 'segredoentrenois';

const createUser = async (body) => {
  const { error } = validateUser(body);

  if (error) {
    return {
      error,
      status: HTTP_BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    };
  }
  return false;
};

const emailExists = async (email) => {
  const user = await model.findUser(email);

  if (user) {
    return {
      emailRegister: true,
      status: HTTP_CONFLICT,
      message: 'Email already registered',
    };
  }
  return false;
};

const isLoged = async (body) => {
  const { error } = validateLogin(body);

  if (error) {
    return {
      error,
      status: HTTP_UNAUTHORIZED,
      message: 'All fields must be filled',
    };
  }
  return false;
};

const createToken = (user) => {
  const jwtConfig = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const payload = JSON.stringify({ user, role: 'user' });

  // Convertemos o header e o payload para o formato Base64, conforme manda a especificação do JWT. Quando criamos uma string em Base64 é comum ter um ou mais caracteres de = em seu final: isso ocorre porque o número de caracteres de uma string Base64 é sempre múltiplo de 4 e quando isso não acontece naturalmente a string é preenchida com iguais =. Para remove-los utilizamos um replace:. link => https://www.devmedia.com.br/como-o-jwt-funciona/40265
  // const base64Header = Buffer.from(header).toString('base64').replace(/=/g, '');
  // const base64Payload = Buffer.from(payload).toString('base64').replace(/=/g, '');
  // esta solucao so funciona com crypto
  // const data = `${base64Header}.${base64Payload}`;

  const token = jwt.sign(payload, JWT_SECRET, jwtConfig);
  return token;
};

const isUser = async (email, password) => {
  const user = await model.findUser(email);
  if ((user && user.email) !== email || user.password !== password) {
    return {
      error: true,
      status: HTTP_UNAUTHORIZED,
      message: 'Incorrect username or password',
    };
  }

  const token = createToken(user);
  return { token, user };
};

module.exports = {
  createUser,
  emailExists,
  isLoged,
  isUser,
};
