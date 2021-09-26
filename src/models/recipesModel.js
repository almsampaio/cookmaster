const connect = require('./connection');

const addRecipe = async (dataToken, name, ingredients, preparation) => {
  const db = await connect();
  const { _id } = dataToken;
  const result = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId: _id,
  });
  return { recipe: result.ops[0] };
};

module.exports = { addRecipe };
