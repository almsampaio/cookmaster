const getAllRecipes = require('./getAllRecipes');
const insertRecipe = require('./insertRecipe');
const insertUserController = require('./insertUserControler');
const loginController = require('./loginController');

module.exports = {
    insertUserController,
    loginController,
    insertRecipe,
    getAllRecipes,
};