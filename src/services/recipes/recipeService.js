const { ObjectId } = require('mongodb');
const recipeModel = require('../../models/recipes/recipeModel');

const createRecipeService = async (name, ingredients, preparation, userId) => {
    if (!name || !ingredients || !preparation) {
        return { status: 400, message: { message: 'Invalid entries. Try again.' } };
    }
    
    const recipe = await recipeModel
        .createRecipeModel(name, ingredients, preparation, userId);

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

const editRecipeService = async (params) => {
    const { id, name, ingredients, preparation, userId, role } = params;
    const objId = ObjectId(id);    
    const getRecipe = await getRecipeByIdService(id);

    if (!ObjectId.isValid(id) || getRecipe.message === null) {
        return { status: 401, message: { message: 'recipe not found' } };
    }

    if (userId !== getRecipe.message.userId && role !== 'admin') { 
        return { status: 401, message: { message: 'missing auth token' } };
    }
    
    await recipeModel
    .editRecipeModel(objId, name, ingredients, preparation, role);

    const { message } = await getRecipeByIdService(id);
    
    return { status: 200, message };
};

const deleteRecipeService = async (id, userId, role) => {
    const objId = ObjectId(id);

    if (!ObjectId.isValid(id)) return '401';

    const getRecipe = await getRecipeByIdService(id);

    if (role !== 'admin' && userId !== getRecipe.message.userId) {
        return false;
    }
    
    await recipeModel.deleteRecipeModel(objId);
    return true;
};

const uploadRecipeImageService = async (id, path, userId, role) => {
    const objId = ObjectId(id);
    
    if (!ObjectId.isValid(id)) return { status: 401, message: 'Recipe not found' };

    const getRecipe = await recipeModel.uploadRecipeImageModel(objId, path, role);

    if (role !== 'admin' && getRecipe.userId !== userId) {
        return { status: 401, message: 'not allowed' };
    }

    return { status: 200, message: getRecipe };
};

module.exports = { 
    createRecipeService, 
    getAllRecipesService,
    getRecipeByIdService,
    editRecipeService,
    deleteRecipeService,
    uploadRecipeImageService,
};