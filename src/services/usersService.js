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

const isUserValid = async (name, email, password) => {
  if (!name || !email || !password) {
    return {
      response: {
        message: 'Invalid entries. Try again.',
      },
      status: 400,
      isValid: false,
    };
  }
  const user = await usersModel.findByEmail(email);
  if (!user) {
    return {
      response: { message: 'Email already registred.' },
      status: 409,
      isValid: false,
    };
  }
};

const getAll = async () => {
  const sales = await usersModel.getAll();
  return {
    response: { sales },
    status: 200,
  };
};

const deleteById = async (id) => {
  const { status, response } = await findById(id);
  if (status === 404) {
    return { 
      response: {
        err: { code: 'invalid_data', message: 'Wrong sale ID format' },
      },
      status: 422,
    };
  }
  await usersModel.deleteById(id);
  return {
    response,
    status: 200,
  };
};

const create = async (name, email, password) => {
  const { isValid, response, status } = await isUserValid(name, email, password);
  if (!isValid) {
    return { response, status };
  }
  const role = 'user';
  const userCreated = await usersModel.create(name, email, password, role);
  return { response: userCreated, status: 201 };
};

const update = async (id, itensSold) => {
  const { status, response } = await findById(id);
  if (status === 404) {
    return { response, status };
  }
  const { isValid, errorInfo, status: statusValidation } = await isUserValid(itensSold, id);
  if (!isValid) {
    return { response: errorInfo, status: statusValidation };
  }
  const saleUpdated = await usersModel.update(id, itensSold);
  return { response: saleUpdated, status: 200 };
};

module.exports = { getAll, findById, deleteById, create, update }; 