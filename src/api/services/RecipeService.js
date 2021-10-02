const RecipeModel = require('../models/RecipeModel');

class RecipeService {
    constructor() {
        this.model = new RecipeModel();
    }

    async findByEmail(email) {
        return this.model.findByEmail(email);
    }

    async create(recipe) {
        const { _id } = recipe;
        const recipeMounted = { ...recipe, userId: _id };
        const recipeCreated = await this.model.save(recipeMounted);
        return { ...recipeCreated };
    }
}

module.exports = RecipeService;
