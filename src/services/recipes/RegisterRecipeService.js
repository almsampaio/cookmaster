const RegisterRecipeModel = require('../../models/recipes/RegisterRecipeModel');

class RegisterRecipeService {
  constructor(recipe, id) {
    this.recipe = recipe;
    this.id = id;
  }

  async handle() {
    const recipeWithUserId = { ...this.recipe, userId: this.id };

    const registerRecipeModel = new RegisterRecipeModel(recipeWithUserId);

    const recipe = await registerRecipeModel.handle();

    return recipe;
  }
}

module.exports = RegisterRecipeService;
