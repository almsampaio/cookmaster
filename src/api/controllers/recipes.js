const { created, success, noContent } = require('../helpers/http');
const { 
  createRecipeService, 
  getRecipesService, 
  getRecipeService, 
  updateRecipeService, 
  deleteRecipeService,
  addImageRecipe,
} = require('../service/recipe');

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

async function update(request, response, next) {
  try {
    const data = request.body;
    data.userId = request.user;
    const recipe = await updateRecipeService(request.params.id, data);
    return success(response, recipe);
  } catch (err) {
    next(err);
  }
}

async function remove(request, response, next) {
  try {
    await deleteRecipeService(request.params.id);
    return noContent(response);
  } catch (err) {
    next(err);
  }
}

async function addImage(request, response, next) {
  try {
    const imagePath = `localhost:3000/src/uploads/${request.params.id}.jpeg`;
    const recipe = await addImageRecipe(request.params.id, imagePath);
    return success(response, recipe);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, index, show, update, remove, addImage };