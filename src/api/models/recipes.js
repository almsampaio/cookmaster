const connect = require('./connection');

module.exports = {
  async get(id) {
    const db = await connect();
    if (!id) return db.collection('recipes').find({}).toArray();
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
