const connection = require('./connection');

const defaultUser = ({ name, email, role, _id }) => ({ _id, name, email, role });

const postAdmin = async (name, password, email) => {
  const db = await connection();
  const newUser = await db.collection('users')
  .insertOne({ name, password, email, role: 'admin' });
  const data = newUser.ops[0];

  return defaultUser(data);
};

module.exports = { postAdmin };
