const Service = require('../Service');

async function getRecipes(_req, res, next) {
  const serviceResponse = await Service.recipes.getRecipes();
  const { statusCode, payload } = serviceResponse;

  if (payload.error) return next({ statusCode, error: payload.error });
  const { recipe } = payload;
  return res.status(statusCode).json(recipe);
}

async function postRecipe(req, res, next) {
  const { name, ingredients, preparation } = req.body;
  const recipe = { name, ingredients, preparation };

  const serviceResponse = await Service.recipes.postRecipe(recipe);
  const { statusCode, payload } = serviceResponse;

  if (payload.error) return next({ statusCode, error: payload.error });
  return res.status(statusCode).json(payload);
}

module.exports = {
  getRecipes,
  postRecipe,
};
