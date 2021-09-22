const {
  createModel,
  readAllModel,
} = require('../../models/recipes/recipesModel');

const createServices = async (name, ingredients, preparation, userId) => {
  const data = await createModel(name, ingredients, preparation, userId);

  return { data };
};

const readAllServices = async () => {
  const data = await readAllModel();

  return { data };
};

module.exports = {
  createServices,
  readAllServices,
};