const { conn } = require('./conn');

const COLLECTION = 'recipes';

const create = async ({ name, ingredients, preparation }) => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const recipe = await dbConn.insertOne({ name, ingredients, preparation });
  return {
    recipe: recipe.ops[0],
  };
};

const get = async () => {
  const dbConn = await conn().then((db) => db.collection(COLLECTION));
  const recipes = await dbConn.find({}).toArray();
  return recipes;
};

module.exports = { create, get };
