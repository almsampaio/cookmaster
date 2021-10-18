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

const update = async ({ id, name, ingredients, preparation, userId }) => {
if (!id) return { status: 404, data: { menssage: 'invalid id' } };
const getId = await modelsRecipe.getById(id);
if (!getId) return { status: 404, data: { menssage: 'recipes not existe' } };
const result = await modelsRecipe.update({ id, name, ingredients, preparation, userId });
return { status: 200, data: result };
};
module.exports = {
    createRecipe,
    getAll,
    getById,
    update,
};
