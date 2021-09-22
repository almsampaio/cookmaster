const recipesService = require('../services/recipesService');

const register = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
  
    const { message, _id } = await recipesService.register(name, ingredients, preparation);
    console.log(_id);
  
    if (message) return res.status(400).json({ message });
    res.status(201).json({ recipe: { name, ingredients, preparation, userId: user, _id } });
  };

  module.exports = {
    register,
}; 