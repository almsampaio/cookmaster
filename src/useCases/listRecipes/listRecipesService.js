const listRecipesModel = require('./listRecipesModel');

exports.getAll = async () => {
  const recipes = await listRecipesModel.getAll();
  return recipes;
};

exports.getById = async (id) => {
  const [recipe] = await listRecipesModel.getById(id);

  return recipe;
};
