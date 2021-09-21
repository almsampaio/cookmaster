const connection = require('../../seed');

const create = async (user) => {
  const { name, email, password } = user;
  const db = await connection();
  const result = await db.collection('users').insertOne({ name, email, password });
  console.log(result);
};

module.exports = {
  create,
};
