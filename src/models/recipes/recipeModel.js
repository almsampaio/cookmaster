const connection = require('../connection');

const createRecipeModel = async (name, ingredients, preparation, userId) => {
    const db = await connection();
    const recipe = await db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId });

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

const deleteRecipeModel = async (id) => {
    const db = await connection();
    await db.collection('recipes').deleteOne({ _id: id });
};

module.exports = { 
    createRecipeModel, 
    getAllRecipesModel,
    getRecipeByIdModel,
    editRecipeModel,
    deleteRecipeModel,
};