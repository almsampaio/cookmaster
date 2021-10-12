// Solução encontrada em parceria com Eduardo Costa - Turma 10 A
const modelUsers = require('../models/users');

const err = {
  fieldRequired: 'Invalid entries. Try again.',
  emailExistent: 'Email already registered',
};

const validateName = (name) => {
  if (!name) return { message: err.fieldRequired };
};

const validateEmail = (email) => {
  const regexEmail = /[^@]+@[^.]+\..+/g;
  if (!email || !regexEmail.test(email)) return { message: err.fieldRequired };
};

const verifyEmail = async (email) => {
  const allUsers = await modelUsers.getAll();
  const getEmail = allUsers.find((user) => user.email === email);
  if (getEmail) return { message: err.emailExistent };
  return false;
};

const validatePassword = (password) => {
  if (!password) return { message: err.fieldRequired };
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  verifyEmail,
};
