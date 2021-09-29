const recipeModel = require('../models/recipeModel');

const {
//     // emailRegistered,
invalidEntries,
// // allFieldsFilled,
// // incorrectFieldData, /*
wrongJWT,
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

const checkId = async (name, ingredients, preparation, userId) => {
    if (!name || !ingredients || !preparation) { return { status: 400, message: invalidEntries }; }
    if (!userId) return { status: 401, message: wrongJWT };
    return true; 
};

const registerRecipe = async (recipe) => {
const { name, ingredients, preparation, userId } = recipe;
const checkedData = await checkId(name, ingredients, preparation, userId);
console.log('checkedData', checkedData);

if (checkedData !== true) return checkedData;
const result = await recipeModel.registerRecipe(recipe);
// console.log('result', result);
if (result.message) { return { status: result.status, message: result.message }; }
return result;
};

module.exports = {
    getRecipes,
    gettingOneRecipe,
    editingRecipe,
    registerRecipe,
};
