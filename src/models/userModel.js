const mongoConnection = require('./connection');

async function addUser({ name, email, password, role }) {
  const db = await mongoConnection.getConnection();
  const addedUser = db.collection('user').insertOne(
    { name, email, password, role },
  );

  return addedUser;
}

module.exports = {
  addUser,
};
