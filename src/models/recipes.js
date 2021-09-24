const connection = require('./connection');

// const create = async (name, email, password) => {
//   const { insertedId } = await connection()
//     .then((db) => db
//       .collection('users')
//       .insertOne({ name, email, password, role: 'user' }));
//   return { user: { name, email, role: 'user', _id: insertedId } };
// };

const create = async (userId, name, ingredients, preparation) => {
  const { insertedId: _id } = await connection()
    .then((db) => db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
  return { recipe: { name, ingredients, preparation, userId, _id } };
};

const getAll = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

module.exports = { create, getAll };
