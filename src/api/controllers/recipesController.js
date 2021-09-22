const recipeService = require('../services/recipesService');

const register = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
  
    const { message, _id } = await recipeService.register(name, ingredients, preparation);
    console.log(_id);
  
    if (message) return res.status(400).json({ message });
    res.status(201).json({ recipe: { name, ingredients, preparation, userId: user, _id } });
  };

  const getAll = async (_req, res) => {
    const recipes = await recipeService.getAll();
  
    res.status(200).json(recipes);
  };
  
  module.exports = {
    register,
    getAll,
}; 