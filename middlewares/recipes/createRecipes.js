const recipesServices = require('../../services/recipesServices');

const createRecipes = async (req, res) => {
    const { userId } = req.userInfo;
    const { name, ingredients, preparation } = req.body;
    const recipeCreated = await recipesServices.create(name, ingredients, preparation, userId);
    return res.status(201).json({ recipe: recipeCreated });
};

module.exports = { createRecipes };
