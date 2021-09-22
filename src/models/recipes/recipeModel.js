const connection = require('../connection');

const createRecipeModel = async (name, ingredients, preparation, authorId) => {
    const db = await connection();
    const recipe = await db.collection('recipes')
        .insertOne({ name, ingredients, preparation, authorId });

    return recipe.ops[0];
};

const getAllRecipesModel = async () => {
    const db = await connection();
    const recipes = await db.collection('recipes')
        .find({}).toArray();

    return recipes;
};

const getRecipeByIdModel = async (objId) => {
    const db = await connection();
    const recipe = await db.collection('recipes')
        .findOne({ _id: objId });

    return recipe;
};

const editRecipeModel = async (objId, name, ingredients, preparation) => {
    const db = await connection();
    const recipe = await db.collection('recipes')
        .updateOne({ _id: objId }, { $set: { name, ingredients, preparation } });

    return recipe;
};

module.exports = { 
    createRecipeModel, 
    getAllRecipesModel,
    getRecipeByIdModel,
    editRecipeModel,
};