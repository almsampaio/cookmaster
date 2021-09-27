const connection = require('./connection');

const create = async (name, email, password) => {
  const role = 'user';
  const db = await connection();
  const insertedUser = await db.collection('users').insertOne({ name, email, password, role });
  return { name, email, role, _id: insertedUser.insertedId };
};

 const findEmail = async (email) => {
  const db = await connection();
  const registeredEmail = await db.collection('users').findOne({ email });
  return registeredEmail;
};

module.exports = {
  create,
  findEmail,
};
