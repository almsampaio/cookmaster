const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const recipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { _id: recipe.insertedId, name, ingredients, preparation, userId };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const getAll = async () => {
  const db = await connect();
  const recipe = await db.collection('recipes').find({}).toArray();
  return recipe;
};

const updateRecipe = async (id, data) => {
  const { ingredients, preparation, name } = data;
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { ingredients, preparation, name } },
    );
  const updatedRecipe = await findById(id);
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  const db = await connect();
  await db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) });
};

// const addImage = async (id, image) => {
//   const newImage = await db.collection('recipes')
//     .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { image } });
//   return { ...newImage.value, image };
// };

module.exports = {
  create,
  getAll,
  findById,
  updateRecipe,
  deleteRecipe,
  // addImage,
};
