const { ObjectId } = require('mongodb');
const mongoConnect = require('./connection');

const create = async ({ name, ingredients, preparation }) => {
    const usersCollection = await mongoConnect.getConnection()
      .then((db) => db.collection('recipes'));
    const createdUser = await usersCollection.insertOne({ name, ingredients, preparation });
    return {
      name,
      ingredients,
      preparation,
      _id: createdUser.insertedId,
    };
  };

const getAll = async () => {
  const recipesCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('recipes'));
  const listRecipes = await recipesCollection.find().toArray();
  return listRecipes;
};

const getId = async (id) => {
  const recipesCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('recipes'));
  const listRecipeID = await recipesCollection.findOne({ _id: ObjectId(id) });
  return listRecipeID;
};

const update = async ({ id, name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) return null;
  const recipesCollection = await mongoConnect.getConnection();
  const updateRecipe = await recipesCollection.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
  );
  return updateRecipe;
};

module.exports = { create, getAll, getId, update };