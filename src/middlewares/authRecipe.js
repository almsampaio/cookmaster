const recipeSchema = require('../schemas/recipe');
const { badRequest } = require('../utils/httpStatus');

const authRecipe = (request, _response, next) => {
  const { name, ingredients, preparation } = request.body;
  const recipe = { name, ingredients, preparation };

  const { error } = recipeSchema.validate(recipe);

  if (error) return next({ status: badRequest, message: 'Invalid entries. Try again' });

  next();
};

module.exports = authRecipe;
