const connection = require('./connection');
const { ObjectId } = require('mongodb');

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

const find = async (id) => {
  return connection()
    .then((db) => db.collection('recipes').findOne({_id: ObjectId(id)}))
    .then(result => result)
}

module.exports = {
  create,
  getAll,
  find,
}
