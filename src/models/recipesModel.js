const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userID) => {
  const db = await connection();

 const createNewRecipe = await db.collection('recipes')
 .insertOne({ name, ingredients, preparation, userID });

  return { recipe: createNewRecipe.ops[0] };
};

module.exports = {
  createRecipe,
};