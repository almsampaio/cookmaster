const { ObjectId } = require('mongodb');
const recipeModel = require('../../models/recipes/recipeModel');

const createRecipeService = async (name, ingredients, preparation, authorId) => {
    if (!name || !ingredients || !preparation) {
        return { status: 400, message: { message: 'Invalid entries. Try again.' } };
    }
    
    const recipe = await recipeModel
        .createRecipeModel(name, ingredients, preparation, authorId);

    return { status: 201, message: { recipe } };
};

const getAllRecipesService = async () => {
    // just proxy

    const recipes = await recipeModel.getAllRecipesModel();
    return recipes;
};

const getRecipeByIdService = async (id) => {
    if (!ObjectId.isValid(id)) {
        return { status: 404, message: { message: 'recipe not found' } };
    }
    const objId = ObjectId(id);    
    const recipe = await recipeModel.getRecipeByIdModel(objId);
    return { status: 200, message: recipe };
};

const editRecipeService = async (id, name, ingredients, preparation) => {
    if (!ObjectId.isValid(id)) return { status: 404, message: 'recipe not found' };
    const objId = ObjectId(id);    
    await recipeModel.editRecipeModel(objId, name, ingredients, preparation);

    const { message } = await getRecipeByIdService(id);
    
    return { status: 200, message };
};

module.exports = { 
    createRecipeService, 
    getAllRecipesService,
    getRecipeByIdService,
    editRecipeService,
};