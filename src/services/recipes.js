// Solução encontrada em parceria com Eduardo Costa - Turma 10-A
const modelRecipes = require('../models/recipes');
const validations = require('../schemas/validationsRecipes');
const authVerify = require('../auth/authBasic');

const create = async (name, ingredients, preparation, token) => {
  const validateName = validations.validateName(name);
  if (validateName) return { status: 400, data: validateName };
  
  const validateIngredients = validations.validateIngredients(ingredients);
  if (validateIngredients) return { status: 400, data: validateIngredients };
  
  const validatePreparation = validations.validatePreparation(preparation);
  if (validatePreparation) return { status: 400, data: validatePreparation };
  
  const checkToken = await authVerify.validToken(token);
  if (checkToken.message) return { status: 401, data: checkToken };

  const [newRecipe] = await modelRecipes.create(name, ingredients, preparation, checkToken.id);
  return { status: 201, data: { recipe: { ...newRecipe } } };
};

const getAll = async () => {
  const allRecipes = await modelRecipes.getAll();
  return { status: 200, data: [...allRecipes] };
};

const getById = async (id) => {
  const recipe = await modelRecipes.getById(id);
  
  const validateId = validations.validateId(recipe);
  if (validateId) return { status: 404, data: validateId };

  return { status: 200, data: { ...recipe } };
};

const update = async (id, dataBody, token) => {
  const validateToken = await validations.validateToken(token);
  if (validateToken) return { status: 401, data: validateToken };

  const checkToken = await authVerify.validToken(token);
  if (checkToken.message) return { status: 401, data: checkToken };

  const result = await modelRecipes.update(id, dataBody, checkToken.id);

  return { status: 200, data: { ...result } };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
