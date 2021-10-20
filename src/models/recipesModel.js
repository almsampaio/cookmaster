const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  }).then((res) => ({ _id: res.insertedId, name, ingredients, preparation, userId }));

  return newRecipe;
};

module.exports = {
  createRecipe,
};
