const InsertImageRecipeModel = require('../../models/recipes/InsertImageRecipeModel');

class InsertImageRecipeService {
  constructor(id, path) {
    this.id = id;
    this.path = path;
  }

  async handle() {
    const insertImageRecipeModel = new InsertImageRecipeModel(
      this.id,
      this.path,
    );

    const updatedRecipe = await insertImageRecipeModel.handle();

    return updatedRecipe;
  }
}

module.exports = InsertImageRecipeService;
