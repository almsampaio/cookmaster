const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const registerRecipe = async (name, ingredients, preparation, userId) => {
    const db = await mongoConnection.getConnection();
    const { insertedId: id } = await db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId });
  
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

const listRecipeById = async (id) => {
  const isValid = ObjectId.isValid(id);
  if (!isValid) return null;

  const db = await mongoConnection.getConnection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return result;
};

const editRecipe = async (id, data) => {
  const db = await mongoConnection.getConnection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { ...data } },
  );
  const result = await listRecipeById(id);
  return result;
};

const deleteRecipe = async (id) => {
  const isValid = ObjectId.isValid(id);
  if (!isValid) return null;

  const db = await mongoConnection.getConnection();
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return true;
};

const addImg = async (id, image) => {
  const db = await mongoConnection.getConnection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { image } },
  );

  const result = await listRecipeById(id);
  return result;
};

module.exports = {
  registerRecipe,
  listRecipes,
  listRecipeById,
  editRecipe,
  deleteRecipe,
  addImg,
};
