const userModel = require('../models/usersModel');

const ERRORS = require('../utils/errosUsers');

const validateName = (name) => (!name ? ERRORS.INVALID_ENTRIES : null);
const validateEmail = (email) => (!email ? ERRORS.INVALID_ENTRIES : null);
const validatePassword = (password) => (!password ? ERRORS.INVALID_ENTRIES : null);

const validade = (email, name, password) => {
  const emailIsValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
  const nameNotExists = validateName(name);
  const emailNotExists = validateEmail(email);
  const passwordNotExists = validatePassword(password);

  if (nameNotExists) return nameNotExists;
  if (emailNotExists) return emailNotExists;
  if (!emailIsValid) return ERRORS.INVALID_ENTRIES;
  if (passwordNotExists) return passwordNotExists;
};

const create = async (name, email, password, role) => {
  const validateInputs = validade(email, name, password);

  if (validateInputs) return validateInputs;

  const users = await userModel.getAll();
  
  const alreadyExists = !!users.find((user) => user.email === email);
  if (alreadyExists) {
    return {
      message: `Email ${ERRORS.ALREADY_REGISTERED.message}`,
      code: 409,
    };
  }

  const result = await userModel.create(email, password, name, role);
  const { password: _password, ...resultWithoutPassoword } = result;
  return {
    user: resultWithoutPassoword,
  };
};

module.exports = {
  create,
};
