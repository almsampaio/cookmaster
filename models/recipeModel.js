const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getRecipes = async () => {
    const db = await connect();
    const recipe = await db.collection('recipes').find().toArray();
    if (!recipe) return false;
    return recipe;
};

const gettingOneRecipe = async (id) => {
    if (!ObjectId.isValid(id)) return false;
    const db = await connect();
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    if (!recipe) return false;
    return recipe;
};

const editingRecipe = async (id, name, ingredients, preparation, userId) => {
    if (!ObjectId.isValid(id)) return false;
    const db = await connect();
    const recipe = await db.collection('recipes')
    .updateOne({ _id: ObjectId(id), name, ingredients, preparation, userId });
    if (!recipe) return false;
    return recipe;
};

module.exports = {
    getRecipes,
    gettingOneRecipe,
    editingRecipe,
};
