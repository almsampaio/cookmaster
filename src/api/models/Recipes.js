const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createNewRecipe = async (name, ingredients, preparation) => {
const result = await connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return result;
};

const getAllRecipes = async () => {
  const result = await connection()
  .then((db) => db.collection('recipes').find().toArray());
  return result;
};

const getRecipeById = async ({ id }) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  return result;
};

const updateRecipeById = async (id, data) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: new ObjectId(id) },
        { $set: { 
          name: data.name,
          ingredients: data.ingredients,
          preparation: data.preparation } }));
  return result;
};

const deleteRecipe = async ({ id }) => {
  const result = await connection()
  .then((db) => db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) }));
  return result.value;
};

const updateRecipeWithImage = async (id, image) => {
  const data = await connection().then((db) => 
   db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image: `localhost:3000/${image}` } },
    { returnOriginal: false },
  ));
    return data;
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipe,
  updateRecipeWithImage,
};