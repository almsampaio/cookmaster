const connection = require('./connection');

const COLLECTION_NAME = 'users';

// REQUISITO 1

const createUsers = async (newUser) => {
  const db = await connection();
  const user = await db.collection(COLLECTION_NAME).insertOne(newUser);
  return user.ops[0];
};

const usersByEmail = async (email) => {
  const db = await connection();
  let Email = null;
  Email = await db.collection(COLLECTION_NAME).findOne({ email });
  return Email;
};
//  let Email = null - se o email for vazio não disparar erro no service

module.exports = {
  createUsers,
  usersByEmail,
};
