const recipeModels = require('../models/recipe');

const addRecipes = async (name, ingredients, preparation, userId) => {
    const data = recipeModels.addRecipes(name, ingredients, preparation, userId);
    return data;
};

async function editRecipe(id, name, ingredients, preparation) {
    const data = await recipeModels.editRecipe(id, name, ingredients, preparation);
    return data;
}

async function removeRecipe(id) {
    const data = await recipeModels.deleteOneRecepie(id);
    return data;
}

async function addImage(id, path) {
    const data = await recipeModels.addImage(id, path);
    return data;
}

module.exports = { addRecipes, editRecipe, removeRecipe, addImage };
