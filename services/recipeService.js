const recipeModel = require('../models/recipeModel');

const {
//     // emailRegistered,
// // invalidEntries,
// // allFieldsFilled,
// // incorrectFieldData, /*
// wrongJWT,
recipeNotFound,
// missingToken,
} = require('../utils/errorMessages');

const getRecipes = async () => {
    const result = await recipeModel.getRecipes();
    return result;
};

const gettingOneRecipe = async (id) => {
    const result = await recipeModel.gettingOneRecipe(id);
    if (!result) { return { status: 404, message: recipeNotFound }; }
    return result;
};

const editingRecipe = async (id, name, ingredients, preparation) => {
    const updateResult = await recipeModel
    .editingRecipe(id, name, ingredients, preparation);
    return updateResult;
};

module.exports = {
    getRecipes,
    gettingOneRecipe,
    editingRecipe,
};
