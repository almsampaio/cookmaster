const connection = require('./connection');

const create = async (name, email, password) => {
  const role = 'user';

  connection()
   .then((db) => db.collection('users').insertOne({ name, email, password, role }));

  return {
    _id,
    name,
    email,
    role,
  };
};

module.exports = {
  create,
};
