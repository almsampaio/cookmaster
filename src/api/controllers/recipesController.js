const recipesService = require('../service/recipesService');

module.exports = {
  async create(req, res) {
    const { name, ingredients, preparation } = req.body;
    const { user } = req; 

    const newRecipe = await recipesService.create(name, ingredients, preparation, user);

    return res.status(201).json({ recipe: newRecipe });
  },
};