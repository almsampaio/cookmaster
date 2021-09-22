const recipeService = require('../../services/recipes/recipeService');

const createRecipeController = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const authorId = req.user;

    const recipe = await recipeService
        .createRecipeService(name, ingredients, preparation, authorId);

    return res.status(recipe.status).json(recipe.message);
};

const getAllRecipesController = async (req, res) => {
    const recipes = await recipeService.getAllRecipesService();
    return res.status(200).json(recipes);
};

const getRecipeByIdController = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeByIdService(id);
    return res.status(recipe.status).json({ message: recipe.message });
};

const editRecipeController = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipeService.editRecipeService(id, name, ingredients, preparation);
    res.status(200).json(recipe.message);
};

module.exports = {
    createRecipeController,
    getAllRecipesController,
    getRecipeByIdController,
    editRecipeController,
};