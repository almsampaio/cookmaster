const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
    const db = await connection.mongoDB();
    const { ops } = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
    return ops[0];
}; 

const getAll = async () => {
    const db = await connection.mongoDB();
    const recipes = await db.collection('recipes').find().toArray();
    return recipes;
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection.mongoDB();
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return recipe;
};

module.exports = {
    createRecipe,
    getAll,
    getById,
};
