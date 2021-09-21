const UpdateRecipeByIdService = require('../../services/recipes/UpdateRecipeByIdService');

class UpdateRecipeByIdController {
  static async handle(req, res, next) {
    const { name, ingredients, preparation } = req.body;

    const recipe = { name, ingredients, preparation };

    const { id } = req.params;

    const updateRecipeByIdService = new UpdateRecipeByIdService(id, recipe);

    const updatedRecipe = await updateRecipeByIdService.handle();

    if (updatedRecipe.isError) return next(updatedRecipe);

    res.status(200).json(updatedRecipe);
  }
}

module.exports = UpdateRecipeByIdController;
