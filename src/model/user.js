const connection = require('./connection');

const emailAlreadyUsed = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  return user;
};
const newUser = async (name, email, password) => {
  const result = await connection()
    .then((db) => db.collection('users')
      .insertOne({ name, email, password, role: 'user' }));
  const { role, _id } = result.ops[0];
  const userWithoutPass = { user: { 
    name: result.ops[0].name,
    email: result.ops[0].email,
    role,
    _id,
  } };
  return (userWithoutPass);
};

const checkingLogin = async (email, password) => {
  const result = await connection()
  .then((db) => db.collection('users')
    .findOne({ email, password }));
  return result;
};

module.exports = {
  newUser,
  emailAlreadyUsed,
  checkingLogin,
};