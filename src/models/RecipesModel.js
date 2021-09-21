const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  const db = await connection();
  const newRecipe = await db.collection('recipe').insertOne({ name, ingredients, preparation });
  return { _id: newRecipe.insertedId, name, ingredients, preparation };
};

module.exports = {
  createRecipe,
};
