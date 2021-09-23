 const recipeModel = require('../models/recipesModel');

const errors = {
    nameIngredientPreparationEmpty: 'Invalid entries. Try again.',
    idNotFound: 'recipe not found',
};

const validateRecipeItens = (name, ingredients, preparation) => {
    if (!name || !ingredients || !preparation) {
        return { message: errors.nameIngredientPreparationEmpty };
    }
};

const validateRecipeId = async (id) => {
    const existingRecipe = await recipeModel.getById(id);

    if (!existingRecipe) {
        return { message: errors.idNotFound };
    }
};

module.exports = {
    validateRecipeItens,
    validateRecipeId,
};