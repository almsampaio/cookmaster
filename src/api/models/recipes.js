const { ObjectId } = require('mongodb');
const connect = require('./connection');

module.exports = {
  async get(id) {
    const db = await connect();
    
    if (!id) return db.collection('recipes').find({}).toArray();
    
    return db.collection('recipes').findOne({ _id: ObjectId(id) });
  },

  async create(recipe, user) {
    const db = await connect();
    const recipeCreated = await db.collection('recipes').insertOne({
      ...recipe,
      userId: user.id,
    });

    return recipeCreated.ops[0];
  },
};
