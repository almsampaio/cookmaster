const { ObjectId, ObjectID } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (newRecipe) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne(newRecipe);
  
  return recipe.ops[0];
};

const getRecipes = async () => {
  const db = await connection();
  const user = await db.collection('recipes').find().toArray();
  
  return user;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const user = await db.collection('recipes').findOne(new ObjectId(id));

  return user;
};

const editRecipe = async (newData) => {
  const { id, name, ingredients, preparation } = newData;
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();

  const edited = await db
    .collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectID(id) }, 
      { $set: { name, ingredients, preparation } }, 
      { returnOriginal: false },
    );

  if (!edited) return null;

  return edited.value;
};

const vaporizeRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();

  const deleted = await db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) });
  console.log(deleted);
  
  if (!deleted.value) return null;

  return deleted;
};

const putImage = (id, image) => 
  connection()
    .then((db) => db
      .collection('recipes')
        .updateOne({ _id: ObjectID(id) }, { $set: { image } }));

module.exports = {
  createRecipe,
  getRecipes,
  getById,
  editRecipe,
  vaporizeRecipe,
  putImage,
};