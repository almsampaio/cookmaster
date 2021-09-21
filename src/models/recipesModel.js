const connection = require('../../seed');

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const create = async (recipe) => {
  const db = await connection();
  const { ops } = await db.collection('recipes').insertOne(recipe);
  return ops[0];  
};

module.exports = {
  getAll,
  create,
};
