const connection = require('./connection');

const create = async (recipe) => {
  return connection()
    .then((db) => db.collection('recipes').insertOne(recipe))
    .then(result => result.ops[0]);
}

module.exports = {
  create,
}
