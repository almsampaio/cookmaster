const recipeModel = require('../models/recipeModel');

const {
//     // emailRegistered,
// // invalidEntries,
// // allFieldsFilled,
// // incorrectFieldData, /*
// wrongJWT,
recipeNotFound,
missingToken,
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

const editingRecipe = async (recipeData) => {
    const { id, name, ingredients, preparation, userId } = recipeData;
    const result = await recipeModel.gettingOneRecipe(id);
    if (!result) { return { status: 401, message: missingToken }; }
    const updateResult = await recipeModel
    .editingRecipe(id, name, ingredients, preparation, userId);
    return updateResult;
};

module.exports = {
    getRecipes,
    gettingOneRecipe,
    editingRecipe,
};
