// const { ObjectId } = require('mongodb');

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

module.exports = {
  createModel,
};