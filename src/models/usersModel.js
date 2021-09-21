const connection = require('../../seed');

const create = async (user) => {
  const { name, email, password, role } = user;
  const db = await connection();
  const { ops } = await db.collection('users').insertOne({ name, email, password, role });
  return ops[0];
};

module.exports = {
  create,
};
