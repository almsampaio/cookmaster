const {
  createModel,
  readAllModel,
  readByIdModel,
} = require('../../models/recipes/recipesModel');

const createServices = async (name, ingredients, preparation, userId) => {
  const data = await createModel(name, ingredients, preparation, userId);

  return { data };
};

const readAllServices = async () => {
  const data = await readAllModel();

  return { data };
};

const readByIdServices = async (id) => {
  const data = await readByIdModel(id);

  if (!data) {
    return { message: 'recipe not found' };
  }

  return { data };
};

module.exports = {
  createServices,
  readAllServices,
  readByIdServices,
};