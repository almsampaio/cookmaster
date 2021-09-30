const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getRecipes = async () => {
    const db = await connect();
    const recipe = await db.collection('recipes').find().toArray();
    return recipe;
};

const gettingOneRecipe = async (id) => {
    if (!ObjectId.isValid(id)) return false;
    const db = await connect();
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    if (!recipe) return false;
    return recipe;
};

// Método findOneAndUpdate visto no repositório do Felipe Flores
// https://github.com/tryber/sd-010-a-cookmaster/pull/80/files
const editingRecipe = async (id, name, ingredients, preparation) => {
    if (!ObjectId.isValid(id)) return false;
    const db = await connect();
    const object = { id, name, ingredients, preparation };
    const recipe = await db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    if (!recipe) return false;
    return { ...recipe.value, ...object };
};

const registerRecipe = async (recipe) => {
    const db = await connect();
    const recipeAdded = await db.collection('recipes')
    .insertOne(recipe);
    return recipeAdded.ops[0];
};

const deletingRecipe = async (id) => {
    if (!ObjectId.isValid(id)) return false;
    const db = await connect();
    const recipe = await db.collection('recipes')
    .findOneAndDelete({ _id: ObjectId(id) });
    return recipe.value;
};

const addingImage = async (id, Url) => {
    if (!ObjectId.isValid(id)) return false;
    const db = await connect();
    const recipe = await db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { image: Url } });
    return recipe.value;
};

module.exports = {
    getRecipes,
    gettingOneRecipe,
    editingRecipe,
    registerRecipe,
    deletingRecipe,
    addingImage,
};
