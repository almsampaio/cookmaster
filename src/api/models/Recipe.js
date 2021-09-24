const connection = require('./connection');

const COLLECTION = 'recipes';

exports.create = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();

  const recipe = await db.collection(COLLECTION).insertOne({ name, ingredients, userId });

  return {
    _id: recipe.insertedId,
    name,
    ingredients,
    preparation,
    userId,
  };
};