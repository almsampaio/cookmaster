const modelsRecipes = require('../models/recipesModels');
const validToken = require('../schemas/validationsRecipes');
const authVerify = require('../auth/authBasic');

const createRecipe = async (name, ingredients, preparation, token) => {
  const tokenVerify = await authVerify.validToken(token);

  // console.log('tokenVerify', tokenVerify);

  const validFields = validToken.fieldsRequired(name, ingredients, preparation);
  if (validFields) return { status: 400, data: validFields };

  if (tokenVerify.message) return { status: 401, data: tokenVerify };

  const [newRecipes] = await modelsRecipes
    .createRecipes(name, ingredients, preparation, tokenVerify.id);

  // const { _id, name, ingredients, preparation } = newRecipes;

  console.log('service', newRecipes);

  return { status: 201, data: { recipe: { ...newRecipes } } };
  
  // return { status: 201,
  // data: { recipe: { _id, name, ingredients, preparation, userId: tokenVerify.id } } };
};

module.exports = {
  createRecipe,
};