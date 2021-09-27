const connection = require('./connection');

const create = async (recipe) => {
  return connection()
    .then((db) => db.collection('recipes').insertOne(recipe))
    .then(result => result.ops[0]);
}

const getAll = async () => {
  return connection()
    .then((db) => db.collection('recipes').find().toArray())
    .then(result => result)
}

module.exports = {
  create,
  getAll,
}
