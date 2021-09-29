const recipeService = require('../services/recipeService');

// const {
    // wrongJWT,
    // missingToken,
//   } = require('../utils/errorMessages');

const getRecipes = async (req, res) => {
    const result = await recipeService.getRecipes();
    return res.status(200).json(result);
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

const registerRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.token;
    const userId = _id;
    const recipe = { name, ingredients, preparation, userId };
    const result = await recipeService.registerRecipe(recipe);
    if (result.message) return res.status(result.status).json({ message: result.message });
    return res.status(201).send({ recipe: result });
};

module.exports = {
    getRecipes,
    gettingOneRecipe,
    editingRecipe,
    registerRecipe,
};
