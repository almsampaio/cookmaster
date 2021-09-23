const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = connection();
  const findAll = await db.collection('users').findAll({});
  return findAll;
};

const create = async (name, email, password) => {
  const db = connection();
  const insert = await db.collection('user').insertOne({ name, email, password });
  return insert; // lembrar de modificar a resposta do db fazendo filtragem dos dados recebidos
};

module.exports = {
  getAll,
  create,
};
