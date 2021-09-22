const connection = require('./connection');

const recipesSubmit = async ({ name, ingredients, preparation }, userId) => {
    const db = await connection();
    const newRecipe = await db.collection('recipes').insertOne({ name, ingredients, preparation });
    const { insertedId: _id } = newRecipe;
    return { recipe: { name, ingredients, preparation, userId, _id } };
};

module.exports = {
  recipesSubmit,
};
