const connection = require('./connection');

const create = (name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
  .then((result) => result.ops[0]);

const getAll = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

module.exports = {
  create,
  getAll,
};
