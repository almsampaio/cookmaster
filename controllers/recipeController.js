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
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const result = await recipeService.editingRecipe(id, name, ingredients, preparation);
    if (result.message) return res.status(result.status).json({ message: result.message });
    return res.status(200).json(result);
};

const deletingRecipe = async (req, res) => {
    const { id } = req.params;
    const result = await recipeService.deletingRecipe(id);
    if (result.message) return res.status(result.status).json({ message: result.message });
    return res.status(204).json(result);
};

const registerRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.token;
    const userId = _id;
    const recipe = { name, ingredients, preparation, userId };
    const result = await recipeService.registerRecipe(recipe);
    if (result.message) return res.status(result.status).json({ message: result.message });
    return res.status(201).json({ recipe: result });
};

const addingImage = async (req, res) => {
    const { id } = req.params;
  
    const Url = `localhost:3000/src/uploads/${id}.jpeg`;
  
    const imageAdded = await recipeService.addingImage(id, Url);
    res.status(200).json(imageAdded);
};

module.exports = {
    getRecipes,
    gettingOneRecipe,
    editingRecipe,
    registerRecipe,
    deletingRecipe,
    addingImage,
};
