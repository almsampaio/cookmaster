const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const users = db.collection('user').find().toArray();

  return users;
};

module.exports = { getAll };
