const recipesModel = require('../models/recipesModel');
const { requiredFialdsRecipes } = require('../shemes/validationShemes');

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.create(name, ingredients, preparation, userId);
  const { message, code } = requiredFialdsRecipes(name, ingredients, preparation);

  if (message) return { message, code };
  return { recipe };
};

module.exports = { create };
