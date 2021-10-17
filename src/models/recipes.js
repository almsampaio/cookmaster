const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation) => {
    const db = await connection();
    const { ops } = await db.collection('recipes').insertOne({ name, ingredients, preparation });
    return ops[0];
};

module.exports = {
    createRecipes,
};
