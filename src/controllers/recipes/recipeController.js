const recipeService = require('../../services/recipes/recipeService');

const createRecipeController = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;

    const recipe = await recipeService
        .createRecipeService(name, ingredients, preparation, userId);

    return res.status(recipe.status).json(recipe.message);
};

const getAllRecipesController = async (req, res) => {
    const recipes = await recipeService.getAllRecipesService();
    return res.status(200).json(recipes);
};

const getRecipeByIdController = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeByIdService(id);
    return res.status(recipe.status).json(recipe.message);
};

const editRecipeController = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { userId, role } = req.user;
    const params = { id, name, ingredients, preparation, userId, role };
    
    const recipe = await recipeService
        .editRecipeService(params);
    res.status(recipe.status).json(recipe.message);
};

const deleteRecipeController = async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req.user;
    
    const recipe = await recipeService.deleteRecipeService(id, userId, role);
    if (recipe === '401') return res.status(401).json({ message: 'invalid token' });
    if (recipe === false) return res.status(401).json({ message: 'missing auth token' });
    if (recipe) return res.status(204).end();
};

// const uploadRecipeImageController = async (req, res) => {

// };

module.exports = {
    createRecipeController,
    getAllRecipesController,
    getRecipeByIdController,
    editRecipeController,
    deleteRecipeController,
    // uploadRecipeImageController,
};