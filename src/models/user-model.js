const connect = require('./connection');

const createUser = async (name, email, password) => {
  const createUsr = await connect()
    .then((db) =>
      db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then(({ ops }) => ops[0]);

  const { password: _, ...userNotPassword } = createUsr;

  return userNotPassword;
};

module.exports = { createUser };
