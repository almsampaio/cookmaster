const recipesService = require('../services/recipes');

module.exports = {
  async create(req, res) {
    try {
      const recipeCreated = await recipesService.create(req.body, req.user);
      return res.status(201).json({ recipe: recipeCreated });
    } catch (error) {
      return res.status(error.code).json({ message: error.message });
    }
  },
};
