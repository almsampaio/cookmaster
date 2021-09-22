const connection = require('./connection');

// const getAll = async () => {
//   const productsCollection = await connection()
//     .then((db) => db.collection('recipes'));

//   const products = await productsCollection
//     .find()
//     .toArray();

//   return products;
// };

// const format = (obj) => {
//   const { name, email, role, _id } = obj;
//   return { name, email, role, _id };
// };

const addRecipe = async (recipe) => {
  // const allUsers = await getAll();
  // const { email, password, name, role } = recipe;

  // const verifyEmail = allUsers.find((userDb) => userDb.email === email);
  // if (verifyEmail) return false;

  const connectionDb = await connection();

  const newRecipe = await connectionDb.collection('users')
  .insertOne(recipe);

  console.log(newRecipe.ops[0]);
  // const output = format(newRecipe.ops[0]);

  return newRecipe.ops[0];
};

module.exports = {
  addRecipe,
};
