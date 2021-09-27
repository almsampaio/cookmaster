const getConnection = require('./connections');

async function create(name, email, password) {
  const role = 'user';
  const db = await getConnection();
  const data = await db.collection('users').insertOne({ name, email, password, role });
  return { user: { name, email, role, _id: data.insertedId } };
}

async function findEmail(email) {
  const db = await getConnection();
  const data = await db.collection('users').findOne({ email });
  return data;
}

async function findPassword(password) {
  const db = await getConnection();
  const findId = await db.collection('users').findOne({ password });
  return findId;
}

module.exports = {
  create,
  findEmail,
  findPassword,
};
