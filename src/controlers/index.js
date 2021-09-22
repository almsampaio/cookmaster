const deleteRecipe = require('./deleteRecipe');
const getAllRecipes = require('./getAllRecipes');
const getRecipeById = require('./getRecipeById');
const insertImage = require('./insertImage');
const insertRecipe = require('./insertRecipe');
const insertUserController = require('./insertUserControler');
const loginController = require('./loginController');
const updateRecipe = require('./updateRecipe');

module.exports = {
    insertUserController,
    loginController,
    insertRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    insertImage,
};