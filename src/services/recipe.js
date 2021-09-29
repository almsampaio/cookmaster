const recipeModels = require('../models/recipe');

const addRecipes = async (name, ingredients, preparation, userId) => {
    const data = recipeModels.addRecipes(name, ingredients, preparation, userId);
    return data;
};

module.exports = { addRecipes };
