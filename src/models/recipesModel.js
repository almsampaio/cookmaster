const connection = require('./connection');

const createRecipe = async (obj, user) => {
  const { name, ingredients, preparation } = obj;
  const { _id: userId } = user;
  const db = await connection();
  const newRecipe = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  }).then((res) => ({ _id: res.insertedId, name, ingredients, preparation, userId }));

  return newRecipe;
};

const getAllRecipes = async () => {
  const db = await connection();
  const findAllRecipes = db.collection('recipes').find().toArray();
  return findAllRecipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
