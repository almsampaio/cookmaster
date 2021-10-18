// Solução encontrada em parceria com Eduardo Costa - Turma 10-A
const modelRecipes = require('../models/recipes');
const authVerify = require('../auth/authBasic');

const create = async (name, ingredients, preparation, token) => {
  const checkToken = await authVerify.validToken(token);
  if (checkToken.message) return { status: 401, data: checkToken };

  const [newRecipe] = await modelRecipes.create(name, ingredients, preparation, checkToken.id);
  return { status: 201, data: { recipe: { ...newRecipe } } };
};

module.exports = {
  create,
};
