// const recipeModel = require('../models/recipesModel');

const errors = {
    nameIngredientPreparationEmpty: 'Invalid entries. Try again.',
};

const validateRecipeItens = (name, ingredients, preparation) => {
    if (!name || !ingredients || !preparation) {
        return { message: errors.nameIngredientPreparationEmpty };
    }
};

module.exports = {
    validateRecipeItens,
};