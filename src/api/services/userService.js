const User = require('../models/User');
const AppError = require('../utils/AppError');

// Função verifyEmail consultada no meu próprio PR do projeto Trybe Wallet
// Link: https://github.com/tryber/sd-010-a-project-trybewallet/pull/70
const verifyEmail = (email) => {
  const hasOneAtSign = email.split('').filter((el) => el === '@').length === 1; // has to be true
  const hasOneDot = email.split('').filter((el) => el === '.').length === 1; // has to be true
  const doesNotEndWithDot = email[email.length - 1] !== '.'; // has to be true
  return hasOneAtSign && hasOneDot && doesNotEndWithDot;
};

const verifyData = ({ name, email, password }) => {
  if (
    !name
    || !email
    || !password
    || !verifyEmail(email)
    ) return false;

  return true;
};

const verifyEmailIsUnique = async (email) => {
  const user = await User.getUserByEmail(email);

  return user; // se não existir retorna null
};

exports.create = async ({ name, email, password }) => {
  if (!verifyData({ name, email, password })) {
    throw new AppError(400, 'Invalid entries. Try again.');
  }

  const emailAreadyExists = await verifyEmailIsUnique(email);

  if (emailAreadyExists) {
    throw new AppError(409, 'Email already registered');
  }

  const user = await User.create({ name, email, password });

  return user;
};
