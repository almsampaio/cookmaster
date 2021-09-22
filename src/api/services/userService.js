const User = require('../models/User');

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
    return {
      message: 'Invalid entries. Try again.',
      code: 400,
    };
  }

  const emailAreadyExists = await verifyEmailIsUnique(email);

  if (emailAreadyExists) {
    return {
      message: 'Email already registered',
      code: 409,
    };
  }

  const user = await User.create({ name, email, password });

  return { user };
};
