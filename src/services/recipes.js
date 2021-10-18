const modelsRecipe = require('../models/recipes');

// req 4 sem autenticação
const getAll = async () => {
    const result = await modelsRecipe.getAll();
    return result;
};

// req 5 

const getById = async (id) => {
const result = await modelsRecipe.getById(id);
if (!result) {
    return { status: 404, data: { message: 'recipe not found' } };
}
return { status: 200, data: result };
};

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
    getAll,
    getById,
};
