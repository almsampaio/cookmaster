const GetRecipeByIdService = require('../../services/recipes/GetRecipeByIdService');

class GetRecipeByIdController {
  static async handle(req, res, next) {
    const { id } = req.params;

    const getRecipeByIdService = new GetRecipeByIdService(id);

    const recipe = await getRecipeByIdService.handle();

    if (recipe.isError) return next(recipe);

    res.status(200).json(recipe);
  }
}

module.exports = GetRecipeByIdController;
