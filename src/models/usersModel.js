const connect = require('./connection');

const findUser = async (email) => {
  const result = await connect().then((db) => 
  db.collection('users').findOne({ email }));
  return result;
};

const createUser = async (email, password, name, role) => {
  const result = await connect().then((db) => 
    db.collection('users').insertOne({ email, password, name, role }));
  console.log(result);
  return result.ops[0];
};

module.exports = {
  findUser,
  createUser,
};
