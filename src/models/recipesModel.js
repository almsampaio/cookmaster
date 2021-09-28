const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((result) => result.ops[0]);

const getAll = () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

const update = (userId, role, { id, name, ingredients, preparation }) => connection()
  .then((db) => (ObjectId.isValid(id) || role === 'admin' ? db.collection('recipes')
    .updateOne({ _id: ObjectId(id), userId }, { $set: { name, ingredients, preparation } }) : null))
    .then(() => ({ _id: id, name, ingredients, preparation, userId }));

module.exports = {
  create,
  getAll,
  getById,
  update,
};
