const connect = require('./connection');

const registerUser = async (userObj) => {
  const userId = await connect().then((db) =>
    db.collection('users').insertOne(userObj))
    .then((result) => result.insertedId);

  return { _id: userId, ...userObj };
};

const findByEmail = async (email) => {
  const usersCollection = await connect()
    .then((db) => db.collection('users'));

  const user = await usersCollection.findOne({ email });
  return user;
};

module.exports = {
  registerUser,
  findByEmail,
};
