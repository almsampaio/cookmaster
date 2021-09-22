const { ObjectId } = require('mongodb');

const connection = require('../connection');

const createModel = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const insertUsers = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  const result = { 
    _id: insertUsers.insertedId,
    userId,
    name, 
    ingredients, 
    preparation,
  };

  return result;
};

const readAllModel = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find({}).toArray();
  return result;
};

const readByIdModel = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  createModel,
  readAllModel,
  readByIdModel,
};