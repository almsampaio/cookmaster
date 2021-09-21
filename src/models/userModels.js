const connection = require('./connection');

const userDefault = ({ name, email, role, _id }) => ({ _id, name, email, role });

const getByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users')
    .findOne({ email }));

  return user;
};

const postUser = async (name, password, email) => {
  const db = await connection();
  const insertOne = await db.collection('users').insertOne({ name, password, email, role: 'user' });
  const data = insertOne.ops[0];

  return userDefault(data);
};

const postLogin = async (email, password) => {
  const user = await getByEmail(email);

  if (!user || password !== user.password) {
    return { message: 'Incorrect username or password' };
  }

  const {
    role,
    _id,
  } = user;

  return {
    role,
    _id,
  };
};

module.exports = { postUser, getByEmail, postLogin };
