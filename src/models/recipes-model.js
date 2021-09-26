const connect = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const createRecipe = await connect()
    .then((db) =>
      db
        .collection('recipes')
        .insertOne({ name, ingredients, preparation, userId }))
    .then(({ ops }) => ops[0]);

  return createRecipe;
};

module.exports = { create };
