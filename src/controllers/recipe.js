const recipieService = require('../services/recipe');
const recipiesModel = require('../models/recipe');

const addRecipies = async (req, res) => { 
    const { name, ingredients, preparation } = req.body;
    const userId = req.user;
    const data = await recipieService.addRecipies(name, ingredients, preparation, userId);
    return res.status(201).json(data);
};

async function findRecipies(_req, res) {
    const recipe = await recipiesModel.findRecipies();
    return res.status(200).json(recipe);
}

async function findRecipeById(req, res) {
    const { id } = req.params;
    const recipe = await recipiesModel.findRecipeById(id);

    if (!recipe) {
    return res.status(404).json({ message: 'Recepie not found' });
    }

    return res.status(200).json(recipe);
}

module.exports = { addRecipies, findRecipies, findRecipeById };