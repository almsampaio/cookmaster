const connect = require('./connection');

module.exports = {
  async create(recipe, user) {
    const db = await connect();
    const recipeCreated = await db.collection('recipes').insertOne({
      ...recipe,
      userId: user.id,
    });

    return recipeCreated.ops[0];
  },
};
