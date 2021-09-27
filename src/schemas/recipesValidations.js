const { ObjectId } = require('mongodb');
const recipesModel = require('../models/recipes');
// const auth = require('./auth');

const validateRecipeInfos = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return {
      errorCode: 400,
      errorInfo: { message: 'Invalid entries. Try again.' },
    };
  }
  return {};
};

const validateRecipeId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      errorCode: 404,
      errorInfo: { message: 'recipe not found' },
    };  
  } 
  const recipe = await recipesModel.getRecipesById(id);
  if (!recipe) {
   return {
     errorCode: 404,
     errorInfo: { message: 'recipe not found' },
   };  
  }
  return {};
};

// const validateRecipeCreator = async (id, token) => {
// const validToken = auth.validateToken(token);
// const recipe = await recipesModel.getRecipesById(id);
// if (validToken.errorCode) return validToken;

// if (recipe.userId !== validToken.id) {
//   return {
//     code: 401,
//     errorInfo: { message: 'jwt malformed' },
//   };
// }
// };

module.exports = {
  validateRecipeInfos,
  validateRecipeId,
};