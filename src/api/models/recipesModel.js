const { ObjectID } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (userId, name, ingredients, preparation) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne({
    userId,
    name,
    ingredients,
    preparation,
  });

  const recipe = result.ops[0];
  return {
    recipe,
  };
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipesById = async (id) => {
  if (!ObjectID.isValid(id)) {
        return null;
      }
  const db = await connection();
  const recipes = await db.collection('recipes').findOne({ _id: ObjectID(id) });
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipesById,
};

// const findById = async (id) => {
//   if (!ObjectID.isValid(id)) {
//     return null;
//   }
//   const products = await connection()
//     .then((db) => db.collection('products').findOne({ _id: ObjectID(id) }));
//   // console.log(products);
//   // .then((result) => result);
//   return products;
// };

// const updateById = async (id, name, quantity) => {
//   const db = await connection();
//   await db.collection('products')
//     .updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } });
//   const findOne = findById(id);
//   return findOne;
// };

// const deleteById = async (id) => {
//   if (!ObjectID.isValid(id)) {
//     return null;
//   }
//   const db = await connection();
//   const products = await db.collection('products')
//     .deleteOne({ _id: ObjectID(id) });
//   return products;
// };