// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getRecipes = async () => {
    const db = await connect();
    const recipe = await db.collection('recipes').find().toArray();
    if (!recipe) return false;
    return recipe;
};

module.exports = {
    getRecipes,
};
