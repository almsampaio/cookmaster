const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => 
  getConnection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }))
  .then((recipe) => ({ recipe }));

const findRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find({}).toArray();
  if (!recipes) return null;
    return recipes; 
  };

const findRecipesById = async (id) => {
  const idSize = 24;
  if (id.length < idSize) return null;

  const db = await getConnection();
  const ResultFind = await db.collection('recipes').find({ _id: ObjectId(id) }).toArray();
  if (!ResultFind) return null;
    const recipe = ResultFind[0];
    return recipe;
  };
  const updateRecipes = async (id, name, ingredients, preparation) => {
    const db = await getConnection();
    await db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: 
        { name, ingredients, preparation },
      },
      { returnDocument: 'after' },
    );
    const result = await findRecipesById(id);
    return result;
  };

module.exports = { createRecipes, findRecipes, findRecipesById, updateRecipes };