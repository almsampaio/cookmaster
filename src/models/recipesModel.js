const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
  .then((result) => result.ops[0]);

const getAll = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

module.exports = {
  create,
  getAll,
  getById,
};
