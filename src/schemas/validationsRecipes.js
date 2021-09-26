// const modelsRecipes = require('../models/recipesModels');
// 400
// message: 'Invalid entries. Try again.'

// 401
// message: 'jwt malformed'
// message: 'missing auth token'

const err = {
  fieldRequired: 'Invalid entries. Try again.',
  isExistsRecipes: 'recipe not found',
  authToken: 'missing auth token',
};

const fieldsRequired = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return { message: err.fieldRequired };
  return false;
};

const idExists = (recipe) => {
  if (!recipe) return { message: err.isExistsRecipes };
  return false;
};

const missingAuthToken = (token) => {
  if (!token) return { message: err.authToken };
  return false;
};

module.exports = {
  fieldsRequired,
  idExists,
  missingAuthToken,
};
