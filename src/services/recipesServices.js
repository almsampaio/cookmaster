const verifyRecipe = require('../auth/verifyRecipe');
const { createRecipe } = require('../models/recipesModel');
const { CREATED } = require('../utils/statusSuccess');

const create = async (name, ingredients, preparation, user) => {
  const verifyEmptyFields = await verifyRecipe(name, ingredients, preparation);
  const createR = await createRecipe(verifyEmptyFields, user);
  const response = { recipe: { ...createR } };
  return { status: CREATED, message: response };
};

module.exports = create;
