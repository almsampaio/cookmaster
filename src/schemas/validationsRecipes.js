// const modelsRecipes = require('../models/recipesModels');
// 400
// message: 'Invalid entries. Try again.'

// 401
// message: 'jwt malformed'

const err = {
  fieldRequired: 'Invalid entries. Try again.',
  isExistsRecipes: 'recipe not found',
};

const fieldsRequired = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return { message: err.fieldRequired };
  return false;
};

// const idExists = async (id) => {
//   const recipes = await modelsRecipes.getAllRecipes();
//   const idRecipe = recipes.find((recipe) => recipe.id === id);

//   console.log('validRecipes', idRecipe);
  
//   if (idRecipe) return { message: err.isExistsRecipes };

//   return false;
// };

const idExists = (recipe) => {
  // const recipes = await modelsRecipes.getAllRecipes();
  // const idRecipe = recipes.find((recipe) => recipe.id === id);
  
  if (!recipe) return { message: err.isExistsRecipes };

  return false;
};

module.exports = {
  fieldsRequired,
  idExists,
};
