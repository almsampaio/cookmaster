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

const updateById = async (id, name, ingredients, preparation) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection.mongoDB();
    const recipe = await db.collection('recipes').findOneAndUpdate({ _id: ObjectId(id) },
     { $set: { name, ingredients, preparation } }, { returnOriginal: false });
    return recipe.value;
};

const deleteById = async (id) => {
    const db = await connection.mongoDB();
    await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
    createRecipe,
    getAll,
    getById,
    updateById,
    deleteById,
};
