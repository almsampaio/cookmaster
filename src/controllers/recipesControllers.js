const create = require('../services/recipesServices');

const createRecipe = async (request, response, next) => {
  try {
    const { user } = request;
    const { name, ingredients, preparation } = request.body;
    const validyRecipe = await create(name, ingredients, preparation, user);

    return response.status(validyRecipe.status).json(validyRecipe.message);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createRecipe,
};
