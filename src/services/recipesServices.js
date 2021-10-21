const verifyRecipe = require('../auth/verifyRecipe');
const { createRecipe, getAllRecipes, findRecipeById } = require('../models/recipesModel');
const { notFound } = require('../utils/messages');
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

const findRecipe = async (id) => {
  const search = await findRecipeById(id);
  if (!search) throw notFound;
  return { status: STATUS_OK, message: search };
};

module.exports = {
  create,
  getAll,
  findRecipe,
};
