const RecipeModel = require('../models/RecipeModel');

class RecipeService {
    constructor() {
        this.model = new RecipeModel();
    }

    async list() {
        return this.model.list();
    }

    async getById(id) {
        return this.model.getById(id);
    }

    async create(recipe) {
        return this.model.save(recipe);
    }

    async update(recipe) {
        return this.model.update(recipe);
    }

    async delete(id) {
        return this.model.delete(id);
    }

    async upload(id, name) {
        const path = `localhost:3000/src/uploads/${name}`;
        return this.model.upload(id, path);
    }
}

module.exports = RecipeService;
