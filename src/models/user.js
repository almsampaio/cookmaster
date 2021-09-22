const connection = require('./connection');

const getAll = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('users'));

  const products = await productsCollection
    .find()
    .toArray();

  return products;
};

const format = (obj) => {
  const { name, email, role, _id } = obj;
  return { name, email, role, _id };
};

const create = async (user) => {
  const allUsers = await getAll();
  const { email, password, name, role } = user;

  const verifyEmail = allUsers.find((userDb) => userDb.email === email);
  if (verifyEmail) return false;

  const connectionDb = await connection();

  const newUser = await connectionDb.collection('users')
  .insertOne({ email, password, name, role });

  const output = format(newUser.ops[0]);

  return output;
};

const login = async (email) => {
  // const allUsers = await getAll();
  // const { email, pass, name, role } = user;

  const connectionDb = await connection();

  const findUser = await connectionDb.collection('users')
  .findOne({ email });

  if (!findUser) return false;

  return findUser;
};

module.exports = {
  create,
  login,
};
