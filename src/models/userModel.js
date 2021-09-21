const connect = require('./connection');

const createUser = async (name, email, password, role) => {
  const db = await connect();
  const user = await db.collection('users').insertOne({ name, email, password, role });
  return {
      name,
      email,
      role,
      id_: user.insertedId,
  };
};

module.exports = { createUser };