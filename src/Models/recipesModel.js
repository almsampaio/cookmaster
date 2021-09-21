const connect = require('./connection');

const create = async (payload) => {
  const recipeId = await connect.getConnection().then((db) =>
    db.collection('recipes').insertOne(payload))
    .then((result) => result.insertedId);
  return recipeId;
};

module.exports = {
  create,
};
