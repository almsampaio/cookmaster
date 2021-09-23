// const { ObjectId } = require('mongodb');
const connectDB = require('./connectDB');

const created = async (name, email, password) => {
  const conect = await connectDB();
  const { ops: newUser } = await conect.collection('users')
    .insertOne({ name, email, password, role: 'user' });

  // console.log(newUser);
  return newUser;
};

const getAll = async () => {
  const conect = await connectDB();
  const users = await conect.collection('users').find({}).toArray();

  // const users = await connectDB().then((db) => db.collection('users').find({}).toArray());

  return users;
};

const findByEmail = async (email) => {
  const conect = await connectDB();
  const userId = await conect.collection('users').findOne({ email });

  return userId;
};

module.exports = {
  created,
  getAll,
  findByEmail,
};