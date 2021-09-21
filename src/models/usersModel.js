const connect = require('./connection');

const create = async (name, email, password, role) => {
  const db = await connect();
  // console.log(email);
  const findUser = await db.collection('users').findOne({ email });
  if (findUser) return { statusCode: 409 };
  // const user = ({ name, email, password, role });
  const userCreated = await db.collection('users').insertOne({ name, email, password, role });
  // console.log(userCreated);
  // return userCreated.ops[0];
  return { _id: userCreated.insertedId, name, email, role };
};

module.exports = {
  create,
};
