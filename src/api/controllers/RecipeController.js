const RecipeService = require('../services/RecipeService');

class RecipeController {
    static async list(request, response) {
        const recipes = await new RecipeService().list();
        return response.status(200).json(recipes);
    }

    static async getById(request, response) {
        const { id } = request.params;
        const recipe = await new RecipeService().getById(id);
        if (!recipe) return response.status(404).json({ message: 'recipe not found' });
        return response.status(200).json(recipe);
    }

    static async register(request, response) {
        const recipe = request.body;
        const { credentials: { _id } } = request.headers;
        const recipeCreated = await new RecipeService().create({ ...recipe, userId: _id });
        return response.status(201).json({ recipe: recipeCreated });
    }

    static async update(request, response) {
        const recipe = request.body;
        const { credentials: { _id } } = request.headers;
        const { id } = request.params;
        const recipeUpdated = await new RecipeService().update({ ...recipe, _id: id, userId: _id });
        return response.status(200).json(recipeUpdated);
    }

    static async delete(request, response) {
        const { id } = request.params;
        await new RecipeService().delete(id);
        response.status(204).send();
    }
}

module.exports = RecipeController;
