const getConnection = require('./connections');

const create = async (name, ingredients, preparations, userId) => {
  const connectDb = await getConnection();
  const { ops: newRecipe } = await connectDb.collection('recipes')
    .insertOne({ name, ingredients, preparations, userId });

  return newRecipe;
};

module.exports = {
  create,
};
