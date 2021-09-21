const GetAllRecipesService = require('../../services/recipes/GetAllRecipesService');

class GetAllRecipesController {
  static async handle(_req, res) {
    const recipes = await GetAllRecipesService.handle();

    res.status(200).json(recipes);
  }
}

module.exports = GetAllRecipesController;
