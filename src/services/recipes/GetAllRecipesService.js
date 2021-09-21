const GetAllRecipesModel = require('../../models/recipes/GetAllRecipesModel');

class GetAllRecipesService {
  static async handle() {
    const recipes = await GetAllRecipesModel.handle();

    return recipes;
  }
}

module.exports = GetAllRecipesService;
