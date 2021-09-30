const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const getAll = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null; // estou validadno o id
  
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  const db = await getConnection();

  const createRecepie = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return { recipe: { name, ingredients, preparation, userId, _id: createRecepie.insertedId } };
};

module.exports = {
  getAll,
  getById,
  create,
};