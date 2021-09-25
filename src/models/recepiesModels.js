const connection = require('./connection');

const createRecepie = async (name, ingredients, preparation, userID) => {
  const db = await connection();
  
 const create = await db.collection('recipes')
 .insertOne({ name, ingredients, preparation, userID });

  return { recipe: create.ops[0] };
};

module.exports = {
  createRecepie,
};
