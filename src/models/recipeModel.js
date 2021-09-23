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

async function updateRecipe({ id, name, ingredients, preparation }) {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.getConnection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );

  return {
    name, 
    ingredients,
    preparation,
    _id: id,
  };
}

async function deleteRecipe(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.getConnection();
  await db.collection('recipes').deleteOne(
    { _id: ObjectId(id) },
  );

  return { _id: ObjectId(id) };
}

async function addImageUrl(recipeId) {
  if (!ObjectId.isValid(recipeId)) return null;

  const db = await mongoConnection.getConnection();
  const recipeWithImage = await db.collection('recipes').updateOne(
    { _id: ObjectId(recipeId) },
    { $set: { image: `localhost:3000/src/uploads/${recipeId}.jpeg` } },
  );

  return recipeWithImage;
}

module.exports = {
  addRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
  addImageUrl,
};