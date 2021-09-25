const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const createRecipes = async ({ name, ingredients, preparation }, payload) => {
  const { _id } = payload;
  const userId = _id;
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));

  const inserted = await usersCollection.insertOne({ name, ingredients, preparation, userId })
    .then((res) => res.ops[0]);

  if (!inserted.name) return { error: true };
  return { recipe: inserted };
};

const getAllRecipes = async () => {
  const getAll = await mongoConnection.getConnection()
  .then((db) => db.collection('recipes').find().toArray()); 

  if (!getAll.length) return { error: true };
  return getAll;
};

const getRecipesById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const getById = await mongoConnection.getConnection()
  .then((db) => db.collection('recipes').find({ _id: ObjectId(id) }).toArray()); 

  if (!getById[0]) return null;
  return getById[0];
};

const uptadeRecipesById = async ({ name, ingredients, preparation }, id, userId) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));
  const upt = await usersCollection
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  if (!upt.result.n) return { error: true };

  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

const deleteRecipes = async (id, _userId) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));
  const upt = await usersCollection
    .deleteOne({ _id: ObjectId(id) });

  if (!upt.result.n) return { error: true };

 return 'No body returned for response';
};

const uptadeRecipesWithImage = async (id, path) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));
  const upt = await usersCollection
    .updateOne({ _id: ObjectId(id) }, { $set: { image: `localhost:3000/${path}` } });

  if (!upt.result.n) return { error: true };

  const recipe = await getRecipesById(id);

  const { _id, name, ingredients, preparation, userId, image } = recipe;

  return {
    _id,
    name,
    ingredients,
    preparation,
    userId,
    image,
  };
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipesById,
  uptadeRecipesById,
  deleteRecipes,
  uptadeRecipesWithImage,
};