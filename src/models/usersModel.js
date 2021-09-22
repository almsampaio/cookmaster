const getConnection = require('./connection');

async function createUser(name, email, password) {
  const role = 'user';
  const db = await getConnection();
  const user = await db.collection('users').insertOne({ name, email, password, role });
  return user;
}

async function findUserByEmail(email) {
  const db = await getConnection();
  const result = await db.collection('users').findOne({ email });
  return result;
}

module.exports = {
  createUser,
  findUserByEmail,
};
