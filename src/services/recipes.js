const modelsRecipe = require('../models/recipes');

const createRecipe = async (name, ingredients, preparation) => {
    if (!name || !ingredients || !preparation) {
        return { status: 400, data: { message: 'Invalid entries. Try again.' } }; 
}
    const create = await modelsRecipe.createRecipes(name, ingredients, preparation);
    return { status: 201, data: { recipe: create },
}; 
};

module.exports = {
    createRecipe,
};
