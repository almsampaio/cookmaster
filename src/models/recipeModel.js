const { ObjectId } = require('mongodb');
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

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.getConnection();
  const recipeById = await db
    .collection('recipes')
    .find({ _id: ObjectId(id) })
    .toArray();

  return recipeById[0];
}

module.exports = {
  addRecipe,
  getAll,
  getById,
};