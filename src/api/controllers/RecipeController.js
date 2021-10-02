const RecipeService = require('../services/RecipeService');

class RecipeController {
    static async register(request, response) {
        const recipe = request.body;
        const { credentials: { _id } } = request.headers;
        const recipeCreated = await new RecipeService().create({ ...recipe, _id });
        return response.status(201).json({ recipe: recipeCreated });
    }
}

module.exports = RecipeController;
