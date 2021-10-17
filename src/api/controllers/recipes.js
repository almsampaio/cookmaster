const { created } = require('../helpers/http');
const { createRecipeService } = require('../service/recipe');

async function create(request, response, next) {
  try {
    const addUser = await createRecipeService(request.user, request.body);
    return created(response, addUser);
  } catch (err) {
    next(err);
  }
}

module.exports = { create };