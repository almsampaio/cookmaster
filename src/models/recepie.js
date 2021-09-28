const { ObjectId } = require('bson');
const getConnection = require('./connections');

async function createRecepie(name, ingredients, preparation, userId) {
  const db = await getConnection();
  const data = await db.collection('recipes').insertOne({ name, ingredients, preparation, userId });
  return { recipe: { name, ingredients, preparation, userId, _id: data.insertedId } };
  // return { recipe: data.ops[0] };
}

async function findRecepies() {
  const db = await getConnection();
  const recepies = await db.collection('recipes').find({}).toArray();
  return recepies;
}

async function findRecepieById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const recepie = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recepie;
}

module.exports = {
  createRecepie,
  findRecepies,
  findRecepieById,
};
