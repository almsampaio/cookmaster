const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
    const db = await connection.mongoDB();
    const { ops } = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
    return ops[0];
}; 

module.exports = {
    createRecipe,
};
