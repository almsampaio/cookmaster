const connection = require('./connection');

const getAll = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('users'));

  const products = await productsCollection
    .find()
    .toArray();

  return products;
};

const create = async (user) => {
  const allUsers = await getAll();
  const { email, pass, name, role } = user;

  const verifyEmail = allUsers.find((userDb) => userDb.email === email);
  if (verifyEmail) return false;

  const connectionDb = await connection();

  const newUser = await connectionDb.collection('users')
  .insertOne({ email, pass, name, role });

  console.log(newUser);

  return newUser;
};

module.exports = {
  create,
};
