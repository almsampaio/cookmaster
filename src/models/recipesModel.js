const { ObjectId } = require('mongodb');
const connection = require('./connection');

const coll = 'recipes';

const newRecipe = async (name, ingredients, preparation) => {
  const recipe = await connection()
    .then((db) => db.collection(coll)
      .insertOne({ name, ingredients, preparation, userId: new ObjectId() }))
    .then((result) => ({ ...result.ops[0] }));
  
  return recipe;
};

const getRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection(coll).find().toArray());
  
  return recipes;
};

const getRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connection()
    .then((db) => db.collection(coll).findOne(new ObjectId(id)));

  return recipe;
};

const editRecipe = async (id, body) => {
  await connection()
    .then((db) => db.collection(coll).updateOne({ _id: ObjectId(id) }, { $set: { ...body } }));

  const recipe = await getRecipe(id);

  return recipe;
};

const deleteRecipe = async (id) => connection()
  .then((db) => db.collection(coll).deleteOne({ _id: ObjectId(id) }));

module.exports = {
  newRecipe,
  getRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
};
