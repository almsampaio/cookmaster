const connection = require('./connection');

const insertRecipe = async (name, ingredients, preparation, userId) => {
  console.log(userId);
  const db = await connection();
  const result = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  console.log(result.ops[0]);
  return result.ops[0];
};

module.exports = {
  insertRecipe,
};