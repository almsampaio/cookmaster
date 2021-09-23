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

module.exports = {
    createRecipe,
    getAll,
};
