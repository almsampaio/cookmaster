const usersModel = require('../models/usersModel');

const findById = async (id) => {
  const sale = await usersModel.findById(id);
  if (!sale) {
    return {
      response: {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      },
      status: 404,
    };
  }
  return {
    response: sale,
    status: 200,
  };
};

const isFieldsValid = (name, email, password) => {
  const regexEmailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return !name || !email || !password || !regexEmailFormat.test(email);
};

const isUserValid = async (name, email, password) => {
  if (isFieldsValid(name, email, password)) {
    return {
      response: {
        message: 'Invalid entries. Try again.',
      },
      status: 400,
      isValid: false,
    };
  }
  const user = await usersModel.findByEmail(email);
  if (user) {
    return {
      response: { message: 'Email already registered' },
      status: 409,
      isValid: false,
    };
  }
  return { isValid: true };
};

const create = async (name, email, password) => {
  const { isValid, response, status } = await isUserValid(name, email, password);
  if (!isValid) {
    return { response, status };
  }
  const role = 'user';
  const userCreated = await usersModel.create(name, email, password, role);
  return { response: { user: userCreated }, status: 201 };
};

module.exports = { findById, create }; 