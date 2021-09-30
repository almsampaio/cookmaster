// const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();

  const createRecepie = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return { recipe: { name, ingredients, preparation, userId, _id: createRecepie.insertedId } };
};

module.exports = {
  create,
};