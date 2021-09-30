const Service = require('../Service');

async function getRecipes(_req, res, next) {
  const serviceResponse = await Service.recipes.getRecipes();
  const { statusCode, payload } = serviceResponse;

  if (payload.error) return next({ statusCode, error: payload.error });
  const { recipe } = payload;
  return res.status(statusCode).json(recipe);
}

async function getRecipeById(req, res, next) {
  const { id } = req.params;
  const serviceResponse = await Service.recipes.getRecipeById(id);
  const { statusCode, payload } = serviceResponse;

  if (payload.error) return next({ statusCode, error: payload.error });
  const { recipe } = payload;
  return res.status(statusCode).json(recipe);
}

async function postRecipe(req, res, next) {
  const { name, ingredients, preparation } = req.body;
  const { email } = req.validated;
  const responseFromEmail = await Service.users.findUserEmail(email);
  const { payload: { _id: userId } } = responseFromEmail;
  const recipe = { name, ingredients, preparation };
  const serviceResponse = await Service.recipes.postRecipe(recipe, userId);
  const { statusCode, payload } = serviceResponse;

  if (payload.error) return next({ statusCode, error: payload.error });
  return res.status(statusCode).json(payload);
}

async function putRecipeById(req, res, next) {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { email, role } = req.validated;
  const recipeToEdit = { name, ingredients, preparation };
  const responseFromEmail = await Service.users.findUserEmail(email);
  const { payload: { _id: userId } } = responseFromEmail;
  const user = { id: userId, role };
  const serviceResponse = await Service.recipes.putRecipeById(user, id, recipeToEdit);
  const { statusCode, payload } = serviceResponse;
  if (payload.error) return next({ statusCode, error: payload.error });
  return res.status(statusCode).json(payload);
}

async function deleteRecipeById(req, res, next) {
  const { id } = req.params;
  const { email, role } = req.validated;
  const responseFromEmail = await Service.users.findUserEmail(email);
  const { payload: { _id: userId } } = responseFromEmail;
  const user = { id: userId, role };
  const serviceResponse = await Service.recipes.deleteRecipeById(user, id);
  const { statusCode, payload } = serviceResponse;
  if (payload.error) return next({ statusCode, error: payload.error });
  return res.status(statusCode).json(payload);
}

async function putImage(req, res, next) {
  const { id } = req.params;
  const { email, role } = req.validated;
  const responseFromEmail = await Service.users.findUserEmail(email);
  const { payload: { _id: userId } } = responseFromEmail;
  const user = { id: userId, role };
  const serviceResponse = await Service.recipes.putImage(user, id);
  const { statusCode, payload } = serviceResponse;
  if (payload.error) return next({ statusCode, error: payload.error });
  return res.status(statusCode).json(payload);
}

module.exports = {
  getRecipes,
  getRecipeById,
  postRecipe,
  putRecipeById,
  deleteRecipeById,
  putImage,
};
