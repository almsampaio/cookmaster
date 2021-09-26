const createRecipeService = require('./createRecipeService');
const { created } = require('../../utils/httpStatus');

const createRecipeController = async (request, response) => {
  const { name, preparation, ingredients } = request.body;
  const { _id: userId } = request.decodeToken;

  const createdRecipe = await createRecipeService({ name, preparation, ingredients, userId });

  response.status(created).json({ recipe: createdRecipe });
};

module.exports = createRecipeController;
