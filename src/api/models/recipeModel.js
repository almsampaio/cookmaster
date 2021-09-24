const connection = require('./connection');

const createRecipe = async (newRecipe) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne(newRecipe);
  
  return recipe.ops[0];
};

// const findByEmail = async (email) => {
//   const db = await connection();
//   const user = await db.collection('users').findOne({ email });
//   console.log(email);

//   return user;
// };

const getRecipes = async () => {
  const db = await connection();
  const user = await db.collection('recipes').find().toArray();
  // console.log(email);

  return user;
};

module.exports = {
  createRecipe,
  getRecipes,
};