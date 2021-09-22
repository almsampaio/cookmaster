const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const COLLECTION_NAME = 'recipes';

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipeCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME));

  recipeCollection.findOneAndDelete({ _id: ObjectId(id) });
};

const update = async (id, newDataRecipe) => {
  const { name, ingredients, preparation } = newDataRecipe;

  if (!ObjectId.isValid(id)) return null;

  const recipeCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME));

  const updatedRecipe = await recipeCollection
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
      { 
        // upsert: true,
        // returnDocument: 'after',
        returnOriginal: false,
      },
    );

  return updatedRecipe.value;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipeCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME));

  const recipe = recipeCollection.findOne({ _id: new ObjectId(id) });

  return recipe;
};

const getAll = async () => {
  const recipeCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME));

  const recipes = await recipeCollection.find().toArray();

  return recipes;
};

const create = async (recipe, userId) => {
  const { name, ingredients, preparation } = recipe;

  const recipeCollection = await mongoConnection.getConnection()
  .then((db) => db.collection(COLLECTION_NAME));

  const { insertedId: _id } = await recipeCollection.insertOne(
    { name, ingredients, preparation, userId },
  );

  return {
    recipe: {
      _id,
      name,
      ingredients,
      preparation,
      userId,
    },
  };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};