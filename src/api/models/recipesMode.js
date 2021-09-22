const getConnection = require('./connection');

const collectionName = 'recipes';

const register = async (name, ingredients, preparation) => {
    const db = await getConnection(); 
    const result = await db.collection(collectionName)
    .insertOne({ name, ingredients, preparation });
    return { _id: result.insertedId, name, ingredients, preparation };
  };

const getAllProducts = async () => {
  const db = await getConnection(); 
  const products = await db.collection(collectionName).find({}).toArray();
  return products;
};

  module.exports = {
    register,
    getAllProducts,
  }; 