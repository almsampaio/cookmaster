const { ObjectId } = require('mongodb');
const { conn } = require('./conn');

const COLLECTION = 'recipes';

const create = async ({ name, ingredients, preparation }) => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const recipe = await dbConn.insertOne({ name, ingredients, preparation });
  return {
    recipe: recipe.ops[0],
  };
};

const get = async () => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const recipes = await dbConn.find({}).toArray();
  return recipes;
};

const getById = async (id) => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const recipe = await dbConn.findOne({ _id: ObjectId(id) });
  return recipe;
};

const put = async (id, body, userId) => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const { name, ingredients, preparation } = body;
  await dbConn.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation, userId } },
  );
  return { _id: id, name, ingredients, preparation, userId };
};

const destroy = async (id) => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const shouldDelete = await getById(id);
  await dbConn.deleteOne({ _id: ObjectId(id) });
  return shouldDelete;
};

module.exports = { create, get, getById, put, destroy };
