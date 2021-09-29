const recipeService = require('../services/recipe');
const recipesModel = require('../models/recipe');

const addRecipes = async (req, res) => { 
    const { name, ingredients, preparation } = req.body;
    const userId = req.user;
    const data = await recipeService.addRecipes(name, ingredients, preparation, userId);
    return res.status(201).json(data);
};

async function findRecipes(_req, res) {
    const recipe = await recipesModel.findRecipes();
    return res.status(200).json(recipe);
}

async function findRecipeById(req, res) {
    const { id } = req.params;
    const recipe = await recipesModel.findRecipeById(id);

    if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
    }

    return res.status(200).json(recipe);
}

module.exports = { addRecipes, findRecipes, findRecipeById };