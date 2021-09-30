const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ 
      recipe: { name, ingredients, preparation, userId, _id: result.insertedId },
    }));

module.exports = { 
  create,
};