const recipeModel = require('../models/recipesModel');
const recipeSchema = require('../schemas/recipesSchema');

const create = async (name, ingredients, preparation, userId) => {
    const validateRecipe = recipeSchema.validateRecipeItens(name, ingredients, preparation);

    if (validateRecipe) return validateRecipe;

    const recipes = await recipeModel.create(name, ingredients, preparation, userId);

    console.log(recipes);
    return recipes;
};

module.exports = {
    create,
};