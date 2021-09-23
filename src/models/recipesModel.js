const connect = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
    const db = await connect();
    const recipes = await db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId });
    
    return {
        recipe: {
            name,
            ingredients,
            preparation,
            userId,
            _id: recipes.insertedId,
        },
    };
};

module.exports = {
    create,
};