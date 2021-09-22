const recipesModel = require('../models/recipesModel');

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
};

const findById = async (id) => {
  const product = await recipesModel.findById(id);
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
  await recipesModel.deleteById(id);
  return {
    response: productExists.response,
    status: 200,
  };
};

const create = async (name, ingredients, preparation, userId) => {
  const createdRecipe = await recipesModel.create(name, ingredients, preparation, userId);
  return createdRecipe;
};

const update = async (id, name, quantity) => {
  // const infoValidation = checkProductInfo(name, quantity);
  // if (infoValidation.flag) {
  //   return { response: infoValidation.errorInfo, status: 422 };
  // }
  const productExists = await findById(id);
  if (productExists.status === 422) {
    return productExists;
  }
  const productUpdated = await recipesModel.update(id, name, quantity);
  return {
    response: productUpdated,
    status: 200,
  };
};

module.exports = { getAll, findById, deleteById, create, update }; 