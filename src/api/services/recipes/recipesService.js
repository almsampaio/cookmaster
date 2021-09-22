const {
  createModel,
} = require('../../models/recipes/recipesModel');

const createServices = async (name, ingredients, preparation, userId) => {
  const data = await createModel(name, ingredients, preparation, userId);

  return { data };
};

module.exports = {
  createServices,
};