const connection = require('./connection');

const findByEmail = async (email) => {
  const query = { email };
  const userFound = await connection().then((db) => db
    .collection('users').findOne(query)
    .then((res) => res)).catch((err) => console.log(err));
  return userFound;
};

const registersUser = async ({ name, email, password }) => {
  const registeredUser = await connection().then((db) => db
    .collection('users').insertOne({ name, email, password, role: 'user' }))
    .then(({ ops }) => ops[0]).catch((err) => console.log(err));
  return registeredUser;
};

// const loginUser = async ({ email, password }) => {
//   // 
// };

module.exports = {
  findByEmail,
  registersUser,
};