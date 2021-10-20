const connection = require('../connections/connection');

const addUserRegistration = async (userInfo, role) => {
  const addUser = await connection()
  .then((db) => db.collection('users').insertOne(userInfo));
  return {
    name: addUser.ops[0].name,
    email: addUser.ops[0].email,
    role,
    _id: addUser.insertedId,
  };
};
const searchEmail = async (email) => connection()
  .then((db) => db.collection('users').findOne({ email }));

module.exports = { addUserRegistration, searchEmail }; 