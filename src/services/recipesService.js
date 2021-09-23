const recipeModel = require('../models/recipesModel');
const userModel = require('../models/usersModel');
const recipeSchema = require('../schemas/recipesSchema');

const create = async (name, ingredients, preparation, userId) => {
    const validateRecipe = recipeSchema.validateRecipeItens(name, ingredients, preparation);

    if (validateRecipe) return validateRecipe;

    const recipes = await recipeModel.create(name, ingredients, preparation, userId);

    return recipes;
};

const getAll = async () => {
    const recipes = await recipeModel.getAll();

     const userId = await userModel.getAll();

     const recieveObject = Object.values(userId[1]); 
     
    return recipes.map(({ name, ingredients, preparation, _id }) =>
    ({
        _id,
        name,
        ingredients,
        preparation,
        userId: recieveObject[0],
    }));
};

module.exports = {
    create,
    getAll,
};