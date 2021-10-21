const verifyRecipe = require('../auth/verifyRecipe');
const { createRecipe, getAllRecipes } = require('../models/recipesModel');
const { CREATED, STATUS_OK } = require('../utils/statusSuccess');

const create = async (name, ingredients, preparation, user) => {
  const verifyEmptyFields = await verifyRecipe(name, ingredients, preparation);
  const createR = await createRecipe(verifyEmptyFields, user);
  const response = { recipe: { ...createR } };
  return { status: CREATED, message: response };
};

const getAll = async () => {
  const getRecipes = await getAllRecipes();
  return { status: STATUS_OK, message: getRecipes };
};

module.exports = {
  create,
  getAll,
};
