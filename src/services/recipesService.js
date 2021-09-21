const productsModel = require('../models/productsModel');

const checkProductInfo = (name, quantity) => {
  const testResult = { 
    errorInfo: { err: { code: 'invalid_data', message: '' } },
    flag: false, 
  };
  if (name.length < 5) { 
    testResult.errorInfo.err.message = '"name" length must be at least 5 characters long';
  }
  if (quantity < 1) {
    testResult.errorInfo.err.message = '"quantity" must be larger than or equal to 1';
  }
  if (!Number.isInteger(quantity)) {
    testResult.errorInfo.err.message = '"quantity" must be a number';
  }
  if (testResult.errorInfo.err.message !== '') {
    testResult.flag = true; 
  }
  return testResult;
};

const checkProductExists = async (name) => {
  const product = await productsModel.findByName(name);
  const testResult = { errorInfo: {}, flag: false };
  if (product) {
    testResult.errorInfo = { err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  };
  testResult.flag = true;
  }
  return testResult;
};

const getAll = async () => {
  const products = await productsModel.getAll();
  return {
    response: { products },
    status: 200,
  };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    return {
      response: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      },
      status: 422,
    };
  }
  return {
    response: product,
    status: 200,
  };
};

const deleteById = async (id) => {
  const productExists = await findById(id);
  if (productExists.status === 422) {
    return productExists;
  }
  await productsModel.deleteById(id);
  return {
    response: productExists.response,
    status: 200,
  };
};

const create = async (name, quantity) => {
  const infoValidation = checkProductInfo(name, quantity);
  if (infoValidation.flag) {
    return { response: infoValidation.errorInfo, status: 422 };
  }
  const productExists = await checkProductExists(name);
  if (productExists.flag) {
    return { response: productExists.errorInfo, status: 422 };
  }
  const productCreated = await productsModel.create(name, quantity);
  return { response: productCreated, status: 201 };
};

const update = async (id, name, quantity) => {
  const infoValidation = checkProductInfo(name, quantity);
  if (infoValidation.flag) {
    return { response: infoValidation.errorInfo, status: 422 };
  }
  const productExists = await findById(id);
  if (productExists.status === 422) {
    return productExists;
  }
  const productUpdated = await productsModel.update(id, name, quantity);
  return {
    response: productUpdated,
    status: 200,
  };
};

module.exports = { getAll, findById, deleteById, create, update }; 