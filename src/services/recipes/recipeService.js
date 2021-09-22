const { ObjectId } = require('mongodb');
const createRecipeModel = require('../../models/recipes/recipeModel');

const createRecipeService = async (name, ingredients, preparation, authorId) => {
    if (!name || !ingredients || !preparation) {
        return { status: 400, message: 'Invalid entries. Try again.' };
    }
    
    const recipe = await createRecipeModel(name, ingredients, preparation, authorId);
    return { status: 201, message: recipe };
};

const getAllRecipesService = async () => {
    // just proxy

    const recipes = await createRecipeModel.getAllRecipesModel();
    return recipes;
};

const getRecipeByIdService = async (id) => {
    if (!ObjectId.isValid(id)) return { status: 404, message: 'recipe not found' };
    const objId = ObjectId(id);    
    const recipe = await createRecipeModel.getRecipeByIdModel(objId);
    return { status: 200, message: recipe };
};

module.exports = { 
    createRecipeService, 
    getAllRecipesService,
    getRecipeByIdService,
};