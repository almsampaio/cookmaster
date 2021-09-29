const { ObjectId } = require('mongodb');
const connection = require('./connection');

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

    async function findRecipesById(id) {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    const recipe = await db.collection('recipes').findOne({ id: ObjectId(id) });
    return recipe;
}

module.exports = { addRecipes, findRecipes, findRecipesById };
