const connection = require('./connection');

const createUser = async (name, email, password, role) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ name, email, password, role })
    .then((res) => ({ _id: res.insertedId, name, email, role }));
  // console.log(newUser);
  return newUser;
};

const findEmail = async (email) => {
  const db = await connection();
  const searchEmail = await db.collection('users').findOne({ email });

  if (!searchEmail) return null;
  return searchEmail;
};

module.exports = {
  createUser,
  findEmail,
};
