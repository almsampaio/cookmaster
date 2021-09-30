const { ObjectId } = require('mongodb');
const { connection } = require('../connection/connection');

const addRecipes = async (name, ingredients, preparation, userId) => {
    const db = await connection();
    const data = await db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId });
    return { recipe: { name, ingredients, preparation, userId, _id: data.insertedId } };
};

async function findRecipes() {
    const db = await connection();
    const recipes = await db.collection('recipes').find({}).toArray();
    return recipes;
}

    async function findRecipeById(id) {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return recipe;
}

async function editRecipe(id, name, ingredients, preparation) {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    const data = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return data;
}

async function removeRecipe(id) {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
}

async function addImage(id, path) {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    const data = await findRecipeById(id);
    const { name, ingredients, preparation, userId } = data;
    await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: {
        name,
        ingredients,
        preparation,
        userId,
        image: `localhost:3000/${path}`,
    } });
    const recipeImg = await findRecipeById(ObjectId(id));
    return recipeImg;
    }

module.exports = { addRecipes, findRecipes, findRecipeById, editRecipe, removeRecipe, addImage };
