const UpdateRecipeByIdModel = require('../../models/recipes/UpdateRecipeByIdModel');

class UpdateRecipeByIdService {
  constructor(id, recipe) {
    this.id = id;
    this.recipe = recipe;
  }

  async handle() {
    const updateRecipeByIdModel = new UpdateRecipeByIdModel(
      this.id,
      this.recipe,
    );

    const updatedRecipe = await updateRecipeByIdModel.handle();

    return updatedRecipe;
  }
}

module.exports = UpdateRecipeByIdService;
