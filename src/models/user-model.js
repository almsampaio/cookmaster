const connect = require('./connection');

const createUser = async (name, email, password) => {
  const createUsr = await connect()
    .then((db) =>
      db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then(({ ops }) => ops[0]);

  const { password: _, ...userNotPassword } = createUsr;

  return userNotPassword;
};

const findEmail = async (email) => {
  const userEmail = await connect().then((db) =>
    db.collection('users').findOne({ email }));

  return userEmail;
};

module.exports = { createUser, findEmail };
