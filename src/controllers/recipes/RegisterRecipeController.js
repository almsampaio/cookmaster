const RegisterRecipeService = require('../../services/recipes/RegisterRecipeService');

class RegisterRecipeController {
  static async handle(req, res) {
    const { id } = req.token;

    const { name, ingredients, preparation } = req.body;

    const registerRecipeService = new RegisterRecipeService(
      { name, ingredients, preparation },
      id,
    );

    const recipe = await registerRecipeService.handle();

    res.status(201).json(recipe);
  }
}

module.exports = RegisterRecipeController;
