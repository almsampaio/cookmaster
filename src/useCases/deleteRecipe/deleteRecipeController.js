const deleteRecipeService = require('./deleteRecipeService');
const { noContent } = require('../../utils/httpStatus');

const deleteRecipeController = async (request, response) => {
  const { id: recipeId } = request.params;

  await deleteRecipeService(recipeId);

  response.status(noContent).send();
};

module.exports = deleteRecipeController;
