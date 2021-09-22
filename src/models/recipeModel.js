const mongoConnection = require('./connection');

async function addRecipe({ name, ingredients, preparation, userId }) {
  const db = await mongoConnection.getConnection();

  const { insertedId: _id } = await db.collection('recipes').insertOne({
    name, 
    ingredients,
    preparation,
    userId,
  });

  return {
    name, 
    ingredients,
    preparation,
    userId,
    _id,
  };
}

module.exports = {
  addRecipe,
};