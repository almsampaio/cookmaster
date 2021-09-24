const connection = require('./connection');

const COLLECTION = 'recipes';

exports.create = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();

  const recipe = await db.collection(COLLECTION)
    .insertOne({ name, ingredients, preparation, userId });

  return {
    _id: recipe.insertedId,
    name,
    ingredients,
    preparation,
    userId,
  };
};

exports.getAll = async () => {
  const db = await connection();

  const recipes = await db.collection(COLLECTION).find().toArray();

  return recipes;
};
