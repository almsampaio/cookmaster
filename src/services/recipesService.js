const recipeModel = require('../models/recipesModel');

const getAll = async () => {
  const result = await recipeModel.getAll();
  return result;
};

module.exports = {
  getAll,
};
