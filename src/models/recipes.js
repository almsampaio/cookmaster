const mongoConnection = require('./connection');
const { ObjectId } = require('mongodb');

const registerRecipe = async (name, ingredients, preparation, userId) => {
    const db = await mongoConnection.getConnection();
    const { insertedId: id } = await db.collection('recipes')
      .insertOne({ name, ingredients, preparation });
  
    return { recipe: {
      name,
      ingredients, 
      preparation,
      userId,
      _id: id,
    } };
};

const listRecipes = async () => {
  const db = await mongoConnection.getConnection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const listRecipesById = async (id) => {
  const isValid = ObjectId.isValid(id);
  if (!isValid) return null;

  const db = await mongoConnection.getConnection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  registerRecipe,
  listRecipes,
  listRecipesById,
};
