const { created, success } = require('../helpers/http');
const { createRecipeService, getRecipesService, getRecipeService } = require('../service/recipe');

async function create(request, response, next) {
  try {
    const recipe = await createRecipeService(request.user, request.body);
    return created(response, recipe);
  } catch (err) {
    next(err);
  }
}

async function index(request, response, next) {
  try {
    const recipes = await getRecipesService();
    return success(response, recipes);
  } catch (err) {
    next(err);
  }
}

async function show(request, response, next) {
  try {
    const recipe = await getRecipeService(request.params.id);
    return success(response, recipe);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, index, show };