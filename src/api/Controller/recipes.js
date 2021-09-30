const Service = require('../Service');

async function postRecipe(req, res, next) {
  const { name, ingredients, preparation } = req.body;
  const recipe = { name, ingredients, preparation };

  const serviceResponse = await Service.recipes.postRecipe(recipe);
  const { statusCode, payload } = serviceResponse;

  if (payload.error) return next({ statusCode, error: payload.error });
  return res.status(statusCode).json(payload);
}

module.exports = {
  postRecipe,
};
