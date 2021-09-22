const mongoConnection = require('./connection');

async function getUserByEmail(email) {
  const db = await mongoConnection.getConnection();

  const userByEmail = await db.collection('users').find(
    { email },
    {},
  ).toArray();

  return userByEmail;
}

async function addUser({ name, email, password, role }) {
  const db = await mongoConnection.getConnection();
  const { insertedId: id } = await db.collection('users').insertOne(
    { name, email, password, role },
  );
    console.log(id);
  return {
    name, 
    email,
    role,
    _id: id,
  };
}

module.exports = {
  getUserByEmail,
  addUser,
};
