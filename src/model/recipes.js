const { ObjectId } = require('mongodb');

const connection = require('./connection');

const getOne = async () => {
  const db = await connection();
  const response = await db.collection('recipes').find({}).toArray();
  return response;
};

const createRecipe = async (tokenData, name, ingredients, preparation) => {
  const db = await connection();
  const { _id } = tokenData;
  const response = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId: _id,
  });
  return { recipe: response.ops[0] };
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return result;
};

const edit = async (id, name, ingredients, preparation) => {
  const db = await connection();
  const response = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  );
  return response.value;
};

module.exports = {
  getOne,
  createRecipe,
  getRecipeById,
  edit,
};
