// const { ObjectId } = require('mongodb');

const connection = require('./connection');

const getUserByEmail = (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

const createUser = (name, email, password, role) => connection()
  .then((db) => db.collection('users').insertOne({ name, email, password, role }));

module.exports = {
  createUser, 
  getUserByEmail,
};