const createRecipeService = require('../../services/recipes/recipeService');

const createRecipeController = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const authorId = req.user;

    const recipe = await createRecipeService(name, ingredients, preparation, authorId);

    return res.status(recipe.status).json({ recipe: recipe.message });
};

const getAllRecipesController = async (req, res) => {

    const recipes = await createRecipeService.getAllRecipesService();

    return res.status(200).json(recipes);
};

module.exports = {
    createRecipeController,
    getAllRecipesController,
};