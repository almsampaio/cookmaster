const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addRecipies = async (name, ingredients, preparation, userId) => {
    const db = await connection();
    const data = await db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId });
    return { recipe: { name, ingredients, preparation, userId, _id: data.insertedId } };
};

async function findRecepies() {
    const db = await connection();
    const recepies = await db.collection('recipes').find({}).toArray();
    return recepies;
}

    async function findRecepiesById(id) {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    const recepie = await db.collection('recipes').findOne({ id: ObjectId(id) });
    return recepie;
}

module.exports = { addRecipies, findRecepies, findRecepiesById };
