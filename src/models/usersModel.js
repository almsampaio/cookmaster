const connection = require('../../seed');

const create = async (user) => {
  const db = await connection();
  const { ops } = await db.collection('users').insertOne(user);
  return ops[0];
};

module.exports = {
  create,
};
