const getAllRecipes = require('./getAllRecipes');
const getRecipeById = require('./getRecipeById');
const insertRecipe = require('./insertRecipe');
const insertUserController = require('./insertUserControler');
const loginController = require('./loginController');

module.exports = {
    insertUserController,
    loginController,
    insertRecipe,
    getAllRecipes,
    getRecipeById,
};