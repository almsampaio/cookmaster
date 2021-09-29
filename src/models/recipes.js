const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (recipe, userId) => {
  const db = await connection();
  const result = await db.collection('recipes').insertOne({ ...recipe, userId });
  return { recipe: result.ops[0] };
};

const find = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOne(new ObjectId(id));
  return result;
};

const update = async (recipe, id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { 
      name: recipe.name,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation },
    },
    { returnOriginal: false },
  );
  return result.value;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) });
  return null;
};

const addImage = async (id, urlImage) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image: urlImage } },
    { returnOriginal: false },
  );
  return result.value;
};

module.exports = {
  create,
  find,
  findById,
  update,
  exclude,
  addImage,
};