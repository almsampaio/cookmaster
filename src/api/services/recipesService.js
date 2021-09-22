const invalidEntries = { message: 'Invalid entries. Try again.' };
const recipesModel = require('../models/recipesModel');

function validateData(data) {
if (!data) return invalidEntries;
return false;
}

function register(name, ingredients, preparation) {
    const vname = validateData(name);
    const vingredients = validateData(ingredients);
    const vpreparation = validateData(preparation);
    console.log(vname, vingredients, vpreparation);
    if (vname || vingredients || vpreparation) return invalidEntries;
    const createdRecipes = recipesModel.register(name, ingredients, preparation);
    return createdRecipes;
}

const getAll = async () => {
    const products = await recipesModel.getAllProducts();
    return products;
};
const getById = async (id) => {
    const song = await recipesModel.getById(id);

    return song;
};

module.exports = {
    validateData,
    register,
    getAll,
    getById,
    }; 