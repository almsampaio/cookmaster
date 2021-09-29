const recipeService = require('../services/recipeService');

const getRecipes = async (req, res) => {
    const result = await recipeService.getRecipes();
    return res.status(200).send(result);
};

const gettingOneRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const result = await recipeService.gettingOneRecipe(id, name, ingredients, preparation);
    if (result.message) return res.status(result.status).json({ message: result.message });
    return res.status(200).json(result);
};

const editingRecipe = async (req, res) => {
    const { id } = req.params;
    const result = await recipeService.editingRecipe(id);
    if (result.message) return res.status(result.status).json({ message: result.message });
    return res.status(200).json(result);
};

module.exports = {
    getRecipes,
    gettingOneRecipe,
    editingRecipe,
};
