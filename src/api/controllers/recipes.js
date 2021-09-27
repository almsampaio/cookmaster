const recipesService = require('../services/recipes');

module.exports = {
  async get(req, res) {
    try {
      const recipesOrRecipe = await recipesService.get(req.params.id);
      return res.status(200).json(recipesOrRecipe);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const recipeCreated = await recipesService.create(req.body, req.user);
      return res.status(201).json({ recipe: recipeCreated });
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const recipeUpdated = await recipesService.update(req.params.id, req);
      return res.status(200).json(recipeUpdated);
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await recipesService.delete(req.params.id, req.user);
      return res.status(204).end();
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  },
};
