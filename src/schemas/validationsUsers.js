const modelsUsers = require('../models/usersModels');

const err = {
  campoObrigatorio: 'Invalid entries. Try again.',
  emailJaExisti: 'Email already registered',
};

const nameObrigat = (name) => {
  if (
    !name
    || typeof name !== 'string'
    || name === ''
    || name.length < 3
  ) return { message: err.campoObrigatorio };
  return false;
};

const emailObrigat = (email) => {
  const regexEmail = /[^@]+@[^.]+\..+/g;
  if (!email || email === '' || !regexEmail.test(email)
    || typeof email !== 'string') return { message: err.campoObrigatorio };
};

const passwordObrigat = (password) => {
  if (
    !password 
    || password === '' 
    || password.length < 8
    || typeof password !== 'string'
    ) return { message: err.campoObrigatorio };
};

const emailExists = async (email) => {
  const users = await modelsUsers.getAll();
  const userEmail = users.find((user) => user.email === email);
  
  if (userEmail) return { message: err.emailJaExisti };

  return false;
};

module.exports = {
  nameObrigat,
  emailObrigat,
  emailExists,
  passwordObrigat,
};
