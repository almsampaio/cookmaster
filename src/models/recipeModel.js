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

async function getAll() {
  const db = await mongoConnection.getConnection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
}

module.exports = {
  addRecipe,
  getAll,
};