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

const findUserEmail = async (email) => {
  const db = await connect();
  const userEmail = await db.collection('users').findOne({ email });
  return userEmail;
};

module.exports = { 
  createUser,
  findUserEmail,
};