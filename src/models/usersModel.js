const getConnection = require('./connection');

async function createUser(name, email, password) {
  const role = 'user';
  const db = await getConnection();
  const user = await db.collection('users').insertOne({ name, email, password, role });
  return { user: { name, email, role, _id: user.insertedId } };
}

async function findUserByEmail(email) {
  const db = await getConnection();
  const result = await db.collection('users').findOne({ email });
  return result;
}

const findUserByName = async (name) => {
  const db = await getConnection();
  const user = await db.collection('users').findOne({ name });

  if (!user) return null;

  return user;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByName,
};
