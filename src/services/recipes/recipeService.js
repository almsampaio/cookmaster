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

module.exports = { 
    createRecipeService, 
    getAllRecipesService,
};