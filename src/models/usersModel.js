const connection = require('./connection');

const findByName = async (name) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ name }));

  if (!user) return null;

  return user;
};

const create = async (name, email, password) => {
  const role = 'user';

  connection()
   .then((db) => db.collection('users').insertOne({ name, email, password, role }));

  const { _id } = await findByName(name);

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
